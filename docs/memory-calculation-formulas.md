# 大模型显存计算公式详解

本文档详细说明了 AI 显存计算器使用的所有计算公式，这些公式基于最新的工程实践和学术研究。

## 目录

- [基础概念](#基础概念)
- [训练模式计算](#训练模式计算)
- [推理模式计算](#推理模式计算)
- [微调模式计算](#微调模式计算)
- [实际案例](#实际案例)
- [优化建议](#优化建议)
- [参考文献](#参考文献)

## 基础概念

### 1. 精度类型与字节数

不同的数值精度占用不同的内存空间：

| 精度类型 | 字节数 | 位数 | 说明 |
|---------|--------|------|------|
| FP32 (Float32) | 4 | 32 | 单精度浮点，训练标准精度 |
| FP16 (Float16) | 2 | 16 | 半精度浮点，常用于混合精度训练 |
| BF16 (BFloat16) | 2 | 16 | Brain Float，保持FP32的指数范围 |
| INT8 | 1 | 8 | 8位整数量化 |
| INT4 | 0.5 | 4 | 4位整数量化 |

### 2. 模型参数计算

```
参数显存 = 参数数量 × 精度字节数
```

例如：7B 模型使用 FP16：
```
7 × 10^9 × 2 bytes = 14 GB
```

### 3. 显存组成部分

训练和推理的显存占用主要包括：
- **模型参数**：网络权重
- **梯度**：反向传播的梯度（仅训练）
- **优化器状态**：如Adam的动量（仅训练）
- **激活值**：前向传播的中间结果
- **KV缓存**：注意力机制的缓存（主要在推理）

## 训练模式计算

### 完整公式

```
总显存 = 模型参数 + 梯度 + 优化器状态 + 激活值
```

### 1. 模型参数

```python
model_params_gb = (num_parameters × precision_bytes) / (1024^3)
```

### 2. 梯度

梯度通常与模型参数大小相同：

```python
gradients_gb = model_params_gb
```

### 3. 优化器状态

不同优化器的内存需求：

#### SGD (随机梯度下降)
```python
# 只需要存储动量
optimizer_gb = num_parameters × 4 / (1024^3)  # FP32
```

#### Adam/AdamW
```python
# 需要存储一阶动量和二阶动量
optimizer_gb = num_parameters × 8 / (1024^3)  # 2 × FP32
```

### 4. 激活值计算

激活值是训练中占用显存最多的部分之一：

```python
def calculate_activations(batch_size, seq_len, hidden_size, num_layers, precision):
    precision_bytes = get_precision_bytes(precision)
    
    # 注意力层激活值
    attention_activations = (
        batch_size × seq_len × hidden_size × 3 +  # Q, K, V
        batch_size × seq_len × seq_len            # 注意力分数
    )
    
    # FFN层激活值（通常是4倍hidden_size）
    ffn_activations = batch_size × seq_len × hidden_size × 4 × 2
    
    # 总激活值
    total_activations = (attention_activations + ffn_activations) × num_layers × precision_bytes
    
    return total_activations / (1024^3)  # 转换为GB
```

### 5. 梯度检查点优化

使用梯度检查点可以显著减少激活值占用：

```python
if gradient_checkpointing:
    activations_gb *= 0.3  # 减少约70%的激活值存储
```

### 训练显存计算示例

以 Llama-2 7B 模型为例：
- 参数：7B
- 批次大小：4
- 序列长度：2048
- 精度：FP16
- 优化器：AdamW

```
模型参数：7B × 2 bytes = 14 GB
梯度：14 GB
优化器：7B × 8 bytes = 56 GB
激活值：约 20 GB
总计：约 104 GB
```

## 推理模式计算

### 完整公式

```
总显存 = 模型参数 + KV缓存 + 激活值
```

### 1. 量化模型参数

```python
quantized_params_gb = (num_parameters × precision_bytes × quantization_ratio) / (1024^3)
```

量化比例：
- INT8: 0.25 (相比FP32减少75%)
- INT4: 0.125 (相比FP32减少87.5%)

### 2. KV缓存计算

KV缓存是推理时的主要显存消耗：

```python
def calculate_kv_cache(batch_size, seq_len, hidden_size, num_layers, num_heads, precision):
    precision_bytes = get_precision_bytes(precision)
    
    # 每层需要存储K和V
    kv_cache_per_layer = batch_size × seq_len × hidden_size × 2
    
    # 总KV缓存
    total_kv_cache = kv_cache_per_layer × num_layers × precision_bytes
    
    return total_kv_cache / (1024^3)
```

### 3. 推理激活值

推理时的激活值远小于训练：

```python
inference_activations_gb = training_activations_gb × 0.1  # 约10%
```

### 推理显存计算示例

以 Llama-2 7B 模型为例：
- 参数：7B (INT8量化)
- 批次大小：1
- 序列长度：4096
- KV缓存精度：FP16

```
模型参数：7B × 1 byte = 7 GB
KV缓存：1 × 4096 × 4096 × 32 × 2 × 2 bytes ≈ 4.1 GB
激活值：约 0.5 GB
总计：约 11.6 GB
```

## 微调模式计算

### 1. 全参数微调

与完整训练相同：

```python
total_memory = model_params + gradients + optimizer_state + activations
```

### 2. LoRA (Low-Rank Adaptation)

LoRA 通过低秩分解减少可训练参数：

```python
def calculate_lora_memory(base_params, lora_rank, precision):
    # LoRA参数量估算
    lora_ratio = (2 × lora_rank) / hidden_size  # 假设hidden_size=4096
    lora_params = base_params × lora_ratio
    
    # LoRA显存组成
    lora_params_gb = (lora_params × 10^9 × precision_bytes) / (1024^3)
    lora_gradients_gb = lora_params_gb
    lora_optimizer_gb = lora_params_gb × 2  # Adam
    
    # 基础模型（冻结）
    base_model_gb = (base_params × 10^9 × precision_bytes) / (1024^3)
    
    # 激活值（比全参数微调少）
    activations_gb = 1.0  # 经验值
    
    return base_model_gb + lora_params_gb + lora_gradients_gb + lora_optimizer_gb + activations_gb
```

### 3. QLoRA

QLoRA 结合量化和 LoRA：

```python
def calculate_qlora_memory(base_params, lora_rank):
    # 基础模型使用INT4量化
    quantized_base_gb = (base_params × 10^9 × 0.5) / (1024^3)
    
    # LoRA参数使用FP16
    lora_params = base_params × (2 × lora_rank) / 4096
    lora_memory_gb = (lora_params × 10^9 × 2 × 3) / (1024^3)  # 参数+梯度+优化器
    
    # 减少的激活值
    activations_gb = 0.8
    
    return quantized_base_gb + lora_memory_gb + activations_gb
```

### 微调显存对比

以 Llama-2 7B 为例：

| 方法 | 显存需求 | 相比全参数 |
|------|---------|-----------|
| 全参数微调 | ~104 GB | 100% |
| LoRA (r=8) | ~16 GB | 15% |
| QLoRA (r=8) | ~6 GB | 6% |

## 实际案例

### 案例1：GPT-3 175B 训练

```
参数：175B × 2 bytes (FP16) = 350 GB
梯度：350 GB
优化器：175B × 8 bytes = 1400 GB
激活值：~500 GB (批次大小=1)
总计：~2600 GB

需要：至少 33 个 80GB A100 GPU
```

### 案例2：Llama-2 70B 推理

```
参数：70B × 2 bytes (FP16) = 140 GB
KV缓存：批次32，序列2048 ≈ 40 GB
激活值：~5 GB
总计：~185 GB

需要：至少 3 个 80GB A100 GPU
```

### 案例3：Qwen-72B QLoRA 微调

```
量化模型：72B × 0.5 bytes = 36 GB
LoRA (r=16)：~2 GB（参数+梯度+优化器）
激活值：~2 GB
总计：~40 GB

需要：1 个 48GB A6000 GPU 即可
```

## 优化建议

### 1. 减少批次大小

显存使用与批次大小成正比：
```
显存 ∝ batch_size
```

### 2. 使用梯度累积

通过多次前向传播累积梯度，模拟大批次：
```python
effective_batch_size = batch_size × gradient_accumulation_steps
```

### 3. 混合精度训练

使用 FP16/BF16 可减少 50% 显存：
```python
# 模型和激活值使用FP16
# 主权重和优化器使用FP32
memory_saving = 0.5
```

### 4. 激活值重计算

梯度检查点技术：
- 优点：减少 70% 激活值显存
- 缺点：增加 30% 计算时间

### 5. 模型并行策略

- **数据并行**：每个GPU存储完整模型
- **模型并行**：模型分片存储在多个GPU
- **流水线并行**：按层划分模型

### 6. 量化技术

| 技术 | 显存节省 | 性能损失 |
|------|---------|---------|
| INT8 | 75% | <1% |
| INT4 | 87.5% | 1-3% |
| 2-bit | 93.75% | 3-5% |

## 参考文献

1. **Transformer 架构**
   - Vaswani et al. "Attention Is All You Need" (2017)
   
2. **混合精度训练**
   - Micikevicius et al. "Mixed Precision Training" (2018)
   
3. **梯度检查点**
   - Chen et al. "Training Deep Nets with Sublinear Memory Cost" (2016)
   
4. **LoRA**
   - Hu et al. "LoRA: Low-Rank Adaptation of Large Language Models" (2021)
   
5. **QLoRA**
   - Dettmers et al. "QLoRA: Efficient Finetuning of Quantized LLMs" (2023)
   
6. **量化技术**
   - Dettmers et al. "8-bit Optimizers via Block-wise Quantization" (2022)

## 工具和库

1. **PyTorch**: `torch.cuda.memory_allocated()`
2. **Transformers**: `model.get_memory_footprint()`
3. **DeepSpeed**: ZeRO 优化器
4. **bitsandbytes**: 8-bit 和 4-bit 量化
5. **PEFT**: Parameter-Efficient Fine-Tuning

## 总结

准确的显存计算对于：
- 选择合适的硬件
- 优化训练配置
- 降低计算成本
- 提高训练效率

本计算器基于这些公式提供精确的显存预估，帮助用户做出明智的决策。 
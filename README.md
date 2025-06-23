# Wuhr AI VRAM Insight

<div align="center">
  <h1>🧠 AI显存计算器</h1>
  <p>专业的大语言模型和多模态模型显存需求计算工具</p>
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)
  
  [在线演示](https://vram.wuhrai.com) | [报告问题](https://github.com/wuhr-ai/vram-calculator/issues) | [功能请求](https://github.com/wuhr-ai/vram-calculator/issues) | [博客](https://wuhrai.com)
</div>

## 📖 目录

- [功能特性](#-功能特性)
- [新版本亮点](#-新版本亮点)
- [技术栈](#-技术栈)
- [显存计算公式](#-显存计算公式)
- [支持的模型](#-支持的模型)
- [快速开始](#-快速开始)
- [Docker部署](#-docker部署)
- [项目结构](#-项目结构)
- [API文档](#-api文档)
- [贡献指南](#-贡献指南)
- [许可证](#-许可证)

## 🖼️ 演示截图

### 主界面 - 训练显存计算
![训练显存计算界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v2/vram-v2-1.png)

*专业的训练显存计算界面，支持模型参数、批次大小、序列长度、精度等配置，实时显示显存需求和GPU推荐*

### 单卡GPU推荐系统
![GPU推荐界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v2/vram-v2-02.png)

### 单卡GPU推荐系统
![GPU推荐界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v2/vram-v2-03.png）

*智能GPU推荐系统，根据计算需求自动匹配最适合的GPU，包含利用率分析和价格对比*

## ✨ 功能特性

### 🆕 新版本亮点
- **🔥 多模态模型支持**：新增独立多模态分组，支持文本+图像+音频+视频组合
- **⚡ GRPO算法计算**：支持Group-wise Ranking Preference Optimization显存计算
- **📊 智能标签页排序**：推理→微调→训练→GRPO，更符合使用频率
- **🎯 模型智能分类**：NLP模型和多模态模型完全隔离显示
- **📈 正确计算公式**：基于通用LLM框架重写所有计算公式

### 核心功能
- **🎯 五种计算模式**：推理、微调、训练、GRPO、多模态
- **📊 精确计算**：基于最新工程实践和通用LLM框架的显存计算公式
- **🎨 可视化展示**：饼图展示显存组成，直观了解各部分占比
- **💾 历史记录**：自动保存计算历史，支持对比分析
- **🔧 配置预设**：12+预设模板，快速开始计算
- **📱 响应式设计**：完美适配移动端和桌面端

### 高级特性
- **🌙 深色模式**：保护眼睛，支持系统主题跟随
- **⚡ PWA支持**：可安装为本地应用，支持离线使用
- **🔗 结果分享**：生成分享链接，导出计算报告
- **⌨️ 键盘快捷键**：提高操作效率
- **📈 性能监控**：实时监控应用性能
- **🛡️ 错误处理**：智能错误提示和恢复

### 数据支持
- **50+ 预训练模型**：覆盖主流开源模型，智能分类显示
- **20+ 多模态模型**：支持Qwen2.5-VL、LLaVA、Whisper、Phi-4-Multimodal等
- **20+ GPU规格**：从消费级到数据中心级，包含最新RTX 50系列
- **智能推荐**：根据显存需求推荐合适的GPU
- **价格分析**：GPU性价比对比

## 🛠 技术栈

- **框架**: Next.js 15.3 + React 19
- **语言**: TypeScript 5.0
- **样式**: Tailwind CSS + 玻璃拟态设计
- **状态管理**: Zustand
- **动画**: Framer Motion
- **图表**: Recharts
- **工具**: ESLint, Prettier, Husky

## 📚 支持的模型

### 🤖 NLP/语言模型 (50+个)

#### Qwen系列
- **Qwen2.5**: 0.5B, 1.5B, 3B, 7B, 14B, 32B, 72B
- **Qwen3**: 1.8B, 7B, 14B, 32B, 72B

#### DeepSeek系列  
- **DeepSeek-R1-0528** (70B)
- **DeepSeek-Coder**: 1.3B, 6.7B, 33B
- **DeepSeek-MoE-16B**

#### Llama系列
- **Llama-3.1**: 8B, 70B, 405B
- **Llama-2**: 7B, 13B, 70B

#### ChatGLM系列
- **ChatGLM3-6B**, **ChatGLM4-9B**

#### 其他主流模型
- **Yi**: 6B, 34B
- **Baichuan2**: 7B, 13B  
- **Mistral-7B**, **Mixtral-8x7B**
- **Gemma**: 2B, 7B
- **Phi-3**: Mini(3.8B), Small(7B)
- **CodeLlama**: 7B, 13B, 34B

### 🎨 多模态模型 (20+个) 🆕

#### 视觉语言模型
- **Qwen2.5-VL系列**: 3B, 7B, 72B
- **LLaVA系列**: 1.5-7B, 1.5-13B, NeXT-34B
- **Idefics2-8B**: 高质量视觉理解

#### 音频模型
- **Whisper系列**: Large-v3, Medium, Small
- **OpenOmni-7B**: 多模态对话

#### 视频理解模型  
- **Video-LLaMA-7B**: 视频内容理解
- **Jamba-1.5-Mini**: 文档+视频理解

#### 多模态对话模型
- **Phi-4-Multimodal**: Microsoft最新多模态模型
- **Nougat-Base**: 文档理解专用

### 🎯 模型智能分类

- **NLP分组**：只显示`transformer`、`glm`、`moe`架构的文本模型
- **多模态分组**：只显示`multimodal`架构的多模态模型
- **完全隔离**：避免模型选择混乱，提升用户体验

## 📐 显存计算公式

基于通用LLM框架和最新工程实践的精确计算公式：

### 🔬 通用LLM框架

```
总显存占用 = 模型权重 + 优化器状态 + 梯度 + 激活值 + 其他开销
```

所有计算器均遵循此框架，关键区别在于**P_train（可训练参数量）**的不同。

### 1. 推理显存计算

```
总显存 = 量化模型权重 + KV缓存 + 激活值（少量）

其中：
- 量化模型权重 = P_total × 精度字节数 × 量化比例
- KV缓存 = batch_size × seq_len × hidden_size × 层数 × 2 × 精度字节数
- 激活值 = 训练激活值的10%（推理时较小）
```

### 2. 微调显存计算

#### 全量微调
```
P_train = P_total（所有参数需要梯度）
总显存 = 模型权重 + (P_train × 优化器系数) + (P_train × 梯度精度) + 激活值
```

#### PEFT方法（LoRA/QLoRA/Prefix）
```
P_train << P_total（只有少量参数需要梯度）

LoRA: P_train = calculateLoRAParams(rank)，约为总参数的1%
QLoRA: 基础模型量化 + LoRA参数
Prefix: P_train = 1% × P_total
```

### 3. 训练显存计算

```
P_train = P_total（全量训练）
总显存 = 模型权重 + 优化器状态 + 梯度 + 激活值 + 其他开销

其中：
- 优化器状态 = P_total × 4字节 × 优化器系数（SGD=1, AdamW=2）
- 梯度 = P_total × 训练精度字节数
- 激活值支持梯度检查点（减少70%）
```

### 4. GRPO显存计算 🆕

**核心特点：激活值 = k × SFT激活值**，其中k是偏好组大小

```
GRPO激活值 = k × SFT激活值
其中k = numGenerations（偏好组大小）

对比：
- SFT: 激活值 = 1 × 基础
- DPO: 激活值 ≈ 2 × 基础  
- GRPO(k=4): 激活值 = 4 × 基础
- GRPO(k=8): 激活值 = 8 × 基础

通常使用PEFT方法：
- 模型权重：INT4量化（8倍压缩）
- P_train = 1% × P_total（LoRA等）
- 显存瓶颈：激活值部分
```

### 5. 多模态显存计算 🆕

**核心：Total_Sequence_Length决定激活值显存**

```
Total_Sequence_Length = 文本Token + 图像Patch + 音频Patch + 视频Patch

其中：
- 图像序列长度 = (分辨率/patch_size)² × 图像数量
- 视频序列长度 = 帧数 × 每帧patch数（序列长度爆炸的根源）
- 音频序列长度 = 时长(ms) / 80ms

激活值显存 = batch_size × Total_Sequence_Length × hidden_size × 层数 × 精度字节数
```

#### 精度字节数对照表
| 精度类型 | 字节数 | 说明 |
|---------|--------|------|
| FP32 | 4 | 单精度浮点 |
| FP16/BF16 | 2 | 半精度浮点 |
| INT8 | 1 | 8位整数量化（4倍压缩） |
| INT4 | 0.5 | 4位整数量化（8倍压缩） |

#### 量化比例对照表
| 量化类型 | 压缩比例 | 显存节省 |
|---------|---------|---------|
| None | 1.0 | 0% |
| INT8 | 0.25 | 75% |
| INT4 | 0.125 | 87.5% |

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/wuhr-ai/vram-calculator.git
cd vram-calculator

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

访问 http://localhost:3000 查看应用

## 🐳 Docker部署

### 使用Docker Compose（推荐）

1. 创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    image: wuhr/vram-calculator:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # 可选：Nginx反向代理
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped
```

2. 启动服务：

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 使用Docker构建

```bash
# 构建镜像
docker build -t vram-calculator .

# 运行容器
docker run -d \
  --name vram-calculator \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  vram-calculator
```

### 性能优化配置

- **首次加载**: 178KB（极致优化）
- **代码分割**: 懒加载所有计算器组件
- **PWA缓存**: 离线可用
- **Web Worker**: 后台计算，不阻塞UI

### Kubernetes部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vram-calculator
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vram-calculator
  template:
    metadata:
      labels:
        app: vram-calculator
    spec:
      containers:
      - name: app
        image: wuhr/vram-calculator:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: vram-calculator-service
spec:
  selector:
    app: vram-calculator
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## 📁 项目结构

```
ai-memory-calculator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 主页面（二级标签页布局）
│   │   └── api/               # API路由
│   ├── components/            # React组件
│   │   ├── calculators/       # 计算器组件
│   │   │   ├── inference-calculator.tsx      # 推理计算器
│   │   │   ├── fine-tuning-calculator.tsx    # 微调计算器  
│   │   │   ├── training-calculator.tsx       # 训练计算器
│   │   │   ├── grpo-calculator.tsx          # GRPO计算器
│   │   │   └── multimodal-calculator.tsx    # 多模态计算器
│   │   ├── ui/               # UI组件
│   │   └── ...
│   ├── hooks/                # 自定义Hooks
│   ├── lib/                  # 工具库
│   │   └── models-data.ts    # 70+模型数据库+架构分类
│   ├── store/                # Zustand状态管理
│   ├── types/                # TypeScript类型
│   └── utils/                # 工具函数
│       └── memory-formulas.ts # 通用LLM框架计算公式
├── public/                   # 静态资源
│   ├── workers/             # Web Workers
│   └── ...
├── docs/                    # 详细文档
│   ├── memory-calculation-formulas.md # 计算公式详解
│   └── deployment.md       # 部署指南
├── docker-compose.yml       # Docker编排
├── Dockerfile              # Docker镜像
├── next.config.ts         # Next.js配置
└── package.json          # 项目配置
```

## 📚 API文档

### 健康检查

```http
GET /api/health
```

响应：
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "uptime": 3600
}
```

### 性能分析

```http
POST /api/analytics
Content-Type: application/json

{
  "event": "calculation",
  "type": "training",
  "duration": 150,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 遵循 TypeScript 和 React 最佳实践
- 使用 ESLint 和 Prettier 保持代码风格一致
- 编写清晰的提交信息
- 为新功能添加测试
- 更新相关文档

### 计算公式贡献

如果您发现计算公式问题或想要添加新的算法支持：
1. 在Issues中描述问题或需求
2. 提供相关论文或技术文档
3. 如果可能，提供参考实现

### 报告问题

使用 GitHub Issues 报告问题，请包含：
- 问题描述
- 复现步骤
- 期望行为
- 截图（如果适用）
- 环境信息

## 🏆 更新日志

### v2.0.0 (2024-06-23) 🎉
- ✨ **新增多模态模型支持**：独立分组，支持文本+图像+音频+视频
- ✨ **新增GRPO算法计算**：正确反映偏好组大小的k倍激活值效应
- 🔧 **重构计算公式**：基于通用LLM框架，所有公式统一标准
- 🎯 **优化标签页顺序**：推理→微调→训练→GRPO，符合使用频率
- 🎨 **模型智能分类**：NLP和多模态模型完全隔离
- 📈 **扩展模型数据库**：新增20+多模态模型，总计70+模型
- 🚀 **性能优化**：首次加载优化至178KB

### v1.0.0 (2024-01-01)
- 🎉 初始版本发布
- 支持训练、推理、微调三种模式
- 50+NLP模型支持
- GPU推荐系统

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢所有贡献者
- 基于社区最佳实践的显存计算公式
- 使用了优秀的开源项目：Next.js、React、Tailwind CSS等

## 📞 联系我们

- 博客：[https://wuhrai.com](https://wuhrai.com)
- 模型API：[https://ai.wuhrai.com](https://ai.wuhrai.com)
- 模型Chat：[https://gpt.wuhrai.com](https://gpt.wuhrai.com)
- 邮箱：1139804291@qq.com
- GitHub：[@wuhr-ai](https://github.com/wuhr-ai)

---

<div align="center">
  Made with ❤️ by Wuhr AI Team
</div>

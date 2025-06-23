# Wuhr AI VRAM Insight

<div align="center">
  <h1>🧠 AI显存计算器</h1>
  <p>专业的大语言模型显存需求计算工具</p>
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)
  
  [在线演示](https://vram.wuhr.ai) | [报告问题](https://github.com/wuhr-ai/vram-calculator/issues) | [功能请求](https://github.com/wuhr-ai/vram-calculator/issues) | [博客](https://wuhrai.com)
</div>

## 📖 目录

- [功能特性](#-功能特性)
- [技术栈](#-技术栈)
- [显存计算公式](#-显存计算公式)
- [快速开始](#-快速开始)
- [Docker部署](#-docker部署)
- [项目结构](#-项目结构)
- [API文档](#-api文档)
- [贡献指南](#-贡献指南)
- [许可证](#-许可证)

## ✨ 功能特性

### 核心功能
- **🎯 三种计算模式**：训练、推理、微调（LoRA/QLoRA/全参数）
- **📊 精确计算**：基于最新工程实践的显存计算公式
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
- **50+ 预训练模型**：覆盖主流开源模型
- **20+ GPU规格**：从消费级到数据中心级
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

## 📐 显存计算公式

### 1. 训练模式

```
总显存 = 模型参数 + 梯度 + 优化器状态 + 激活值

其中：
- 模型参数 = 参数量 × 精度字节数
- 梯度 = 模型参数（相同大小）
- 优化器状态 = 
  - SGD: 参数量 × 4字节（动量）
  - Adam/AdamW: 参数量 × 8字节（一阶+二阶动量）
- 激活值 = batch_size × seq_len × hidden_size × 层数 × 系数
  - 系数：正常训练约为10-20，梯度检查点可减少70%
```

#### 精度字节数对照表
| 精度类型 | 字节数 | 说明 |
|---------|--------|------|
| FP32 | 4 | 单精度浮点 |
| FP16/BF16 | 2 | 半精度浮点 |
| INT8 | 1 | 8位整数 |
| INT4 | 0.5 | 4位整数 |

### 2. 推理模式

```
总显存 = 模型参数 + KV缓存 + 激活值

其中：
- 模型参数 = 参数量 × 精度字节数 × 量化比例
- KV缓存 = batch_size × seq_len × hidden_size × 层数 × 2 × 精度字节数
- 激活值 = 推理激活值（约为训练的10%）
```

#### 量化比例
| 量化类型 | 压缩比例 | 说明 |
|---------|---------|------|
| None | 1.0 | 无量化 |
| INT8 | 0.25 | 4倍压缩 |
| INT4 | 0.125 | 8倍压缩 |

### 3. 微调模式

#### LoRA微调
```
总显存 = 基础模型 + LoRA参数 + LoRA梯度 + LoRA优化器

其中：
- LoRA参数 = 基础参数 × (2 × rank / hidden_size)
- LoRA梯度 = LoRA参数
- LoRA优化器 = LoRA参数 × 2（Adam）
```

#### QLoRA微调
```
总显存 = 量化模型 + LoRA参数(FP16) + LoRA梯度 + LoRA优化器

其中：
- 量化模型 = 基础模型 × 0.25（INT4量化）
- 其余同LoRA
```

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
│   │   ├── page.tsx           # 主页面
│   │   └── api/               # API路由
│   ├── components/            # React组件
│   │   ├── calculators/       # 计算器组件
│   │   ├── ui/               # UI组件
│   │   └── ...
│   ├── hooks/                # 自定义Hooks
│   ├── lib/                  # 工具库
│   ├── store/                # Zustand状态管理
│   ├── types/                # TypeScript类型
│   └── utils/                # 工具函数
├── public/                   # 静态资源
│   ├── workers/             # Web Workers
│   └── ...
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

### 报告问题

使用 GitHub Issues 报告问题，请包含：
- 问题描述
- 复现步骤
- 期望行为
- 截图（如果适用）
- 环境信息

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

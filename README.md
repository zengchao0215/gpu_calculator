# Wuhr AI VRAM Insight

<div align="center">
  <h1>🧠 AI VRAM Calculator</h1>
  <p>Professional VRAM requirement calculation tool for Large Language Models and Multimodal Models</p>
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)
  
  [Live Demo](https://vram.wuhrai.com) | [Report Issues](https://github.com/st-lzh/vram-wuhrai/issues) | [Feature Request](https://github.com/st-lzh/vram-wuhrai/issues) | [GitHub Repository](https://github.com/st-lzh/vram-wuhrai.git) | [Blog](https://wuhrai.com)
</div>

---

## 📖 Language / 语言

**English** | [中文](README.zh.md)

---

## 📖 Table of Contents

- [Features](#-features)
- [Version Highlights](#-version-highlights)
- [Tech Stack](#-tech-stack)
- [VRAM Calculation Formulas](#-vram-calculation-formulas)
- [Supported Models](#-supported-models)
- [Quick Start](#-quick-start)
- [Docker Deployment](#-docker-deployment)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [MCP Protocol Support](#-mcp-protocol-support)
- [Contributing](#-contributing)
- [License](#-license)

## 🖼️ Demo Screenshots

### Main Interface - Training VRAM Calculator
![训练显存计算界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v3-01.png)

*Professional training VRAM calculator interface supporting model parameters, batch size, sequence length, precision configuration, with real-time VRAM requirements display and GPU recommendations*

### Single-card GPU Recommendation System
![GPU推荐界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v3-03.png)

### Multi-machine Multi-card GPU Recommendation System
![GPU推荐界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v3-02.png)

*Intelligent GPU recommendation system that automatically matches the most suitable GPUs based on computational requirements, including utilization analysis and price comparison*


## ✨ Features

### 🆕 Version Highlights
- **🔥 Multimodal Model Support**: New independent multimodal grouping supporting text+image+audio+video combinations
- **⚡ GRPO Algorithm Calculation**: Support for Group-wise Ranking Preference Optimization VRAM calculation
- **📊 Intelligent Tab Ordering**: Inference→Fine-tuning→Training→GRPO, aligned with usage frequency
- **🎯 Smart Model Classification**: Complete isolation between NLP models and multimodal models
- **📈 Correct Calculation Formulas**: All calculation formulas rewritten based on unified LLM framework

### Core Features
- **🎯 Five Calculation Modes**: Inference, Fine-tuning, Training, GRPO, Multimodal
- **📊 Precise Calculations**: VRAM calculation formulas based on latest engineering practices and unified LLM framework
- **🎨 Visualization**: Pie charts showing VRAM composition for intuitive understanding of each component's proportion
- **💾 History Records**: Automatic saving of calculation history with comparison analysis support
- **🔧 Configuration Presets**: 12+ preset templates for quick calculation start
- **📱 Responsive Design**: Perfect adaptation for mobile and desktop

### Advanced Features
- **🌙 Dark Mode**: Eye protection with system theme following
- **⚡ PWA Support**: Installable as local application with offline usage support
- **🔗 Result Sharing**: Generate sharing links and export calculation reports
- **⌨️ Keyboard Shortcuts**: Improve operational efficiency
- **📈 Performance Monitoring**: Real-time application performance monitoring
- **🛡️ Error Handling**: Intelligent error prompts and recovery
- **🤖 MCP Protocol Support**: Support for Model Context Protocol, enabling AI assistants to directly call VRAM calculation functions

### Data Support
- **130+ Pre-trained Models**: Covering mainstream Chinese and international open-source models with intelligent classification
- **22+ Multimodal Models**: Supporting Qwen2.5-VL, QwQ-VL, LLaVA, Whisper, etc.
- **12+ Vector Models**: Supporting Qwen3-Embedding, Qwen3-Reranker series
- **20+ GPU Specifications**: From consumer-grade to data center-grade, including latest RTX 50 series
- **Smart Recommendations**: Recommend suitable GPUs based on VRAM requirements
- **Price Analysis**: GPU cost-effectiveness comparison

## 🛠 Tech Stack

- **Framework**: Next.js 15.3 + React 19
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS + Glassmorphism Design
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Tools**: ESLint, Prettier, Husky

## 📚 Supported Models

### 🤖 NLP/Language Models (95+ models)

#### Qwen Series
- **Qwen2.5**: 0.5B, 1.5B, 3B, 7B, 14B, 32B, 72B
- **Qwen3**: 1.8B, 7B, 14B, 32B, 72B

#### DeepSeek Series  
- **DeepSeek-V3-671B** (Full MoE, 37B active)
- **DeepSeek-V3-0324** (Latest optimized version)
- **DeepSeek-R1-671B** (Full reasoning model)
- **DeepSeek-R1-0528** (Latest reasoning model, 685B parameters)
- **deepseek-ai/DeepSeek-R1-0528** (Official Hugging Face version)
- **deepseek-ai/DeepSeek-R1-0528-Qwen3-8B** (8B reasoning model based on Qwen3)
- **DeepSeek-R1 Series**: 1.5B, 7B, 8B, 14B, 32B, 70B
- **DeepSeek-Coder**: 1.3B, 6.7B, 33B
- **DeepSeek-MoE-16B**

#### Llama Series
- **Llama-3.1**: 8B, 70B, 405B
- **Llama-2**: 7B, 13B, 70B

#### ChatGLM Series
- **GLM-4-Plus** (100B, Zhipu's latest large model)
- **GLM-Z1-32B** (Reasoning model, competing with OpenAI o1)
- **GLM-4-9B**, **ChatGLM3-6B**, **ChatGLM4-9B**

#### Yi Series (01.AI)
- **Yi-Lightning** (1000B MoE, 50B active)
- **Yi-Large** (100B)
- **Yi-Medium** (200B MoE, 20B active)
- **Yi-6B**, **Yi-34B**

#### Other Chinese Open-Source Models
- **Qwen3 Series**: 1.8B, 7B, 14B, 32B, 72B (Alibaba's latest)
- **Qwen3-Embedding**: 0.6B, 4B, 8B (Vector models)
- **Qwen3-Reranker**: 0.6B, 4B, 8B (Reranking models)
- **MiniMax-ABAB6.5**: 70B, 100B (MiniMax)
- **Moonshot-v1**: 32K/128K (Moonshot AI)
- **Step-1V** (300B multimodal), **Step-2** (800B MoE) (StepFun)
- **InternLM2.5**: 7B, 20B (InternLM)
- **Spark-Max** (340B MoE), **Spark-Pro** (175B) (iFLYTEK)
- **Baichuan2**: 7B, 13B

#### International Mainstream Models
- **Mistral-7B**, **Mixtral-8x7B**
- **Gemma**: 2B, 7B
- **Phi-3**: Mini(3.8B), Small(7B)
- **CodeLlama**: 7B, 13B, 34B

### 🎨 Multimodal Models (22+ models) 🆕

#### Vision-Language Models
- **Qwen2.5-VL Series**: 3B, 7B, 32B, 72B
- **QwQ-VL-72B**: Reasoning multimodal model with strong visual reasoning capabilities
- **LLaVA Series**: 1.5-7B, 1.5-13B, NeXT-34B
- **Idefics2-8B**: High-quality visual understanding

#### Audio Models
- **Whisper Series**: Large-v3, Medium, Small
- **OpenOmni-7B**: Multimodal dialogue

#### Video Understanding Models  
- **Video-LLaMA-7B**: Video content understanding
- **Jamba-1.5-Mini**: Document+video understanding

#### Multimodal Dialogue Models
- **Phi-4-Multimodal**: Microsoft's latest multimodal model
- **Nougat-Base**: Document understanding specialized

### 🔍 Vector Models (12+ models) 🆕

#### Qwen Vector Model Series
- **Qwen3-Embedding**: 0.6B, 4B, 8B (Text vectorization)
- **Qwen3-Reranker**: 0.6B, 4B, 8B (Document reranking)

### 🎯 Smart Model Classification

- **NLP Grouping**: Only displays text models with `transformer`, `glm`, `moe` architectures
- **Multimodal Grouping**: Only displays multimodal models with `multimodal` architecture
- **Complete Isolation**: Avoids model selection confusion, improves user experience

## 📐 VRAM Calculation Formulas

Precise calculation formulas based on unified LLM framework and latest engineering practices:

### 🔬 Unified LLM Framework

```
Total VRAM Usage = Model Weights + Optimizer States + Gradients + Activations + Other Overheads
```

All calculators follow this framework, with the key difference being **P_train (trainable parameters)**.

### 1. Inference VRAM Calculation

```
Total VRAM = Quantized Model Weights + KV Cache + Activations (minimal)

Where:
- Quantized Model Weights = P_total × precision_bytes × quantization_ratio
- KV Cache = batch_size × seq_len × hidden_size × layers × 2 × precision_bytes
- Activations = 10% of training activations (smaller during inference)
```

### 2. Fine-tuning VRAM Calculation

#### Full Fine-tuning
```
P_train = P_total (all parameters require gradients)
Total VRAM = Model Weights + (P_train × optimizer_factor) + (P_train × gradient_precision) + Activations
```

#### PEFT Methods (LoRA/QLoRA/Prefix)
```
P_train << P_total (only few parameters require gradients)

LoRA: P_train = calculateLoRAParams(rank), approximately 1% of total parameters
QLoRA: Base model quantization + LoRA parameters
Prefix: P_train = 1% × P_total
```

### 3. Training VRAM Calculation

```
P_train = P_total (full training)
Total VRAM = Model Weights + Optimizer States + Gradients + Activations + Other Overheads

Where:
- Optimizer States = P_total × 4bytes × optimizer_factor (SGD=1, AdamW=2)
- Gradients = P_total × training_precision_bytes
- Activations support gradient checkpointing (70% reduction)
```

### 4. GRPO VRAM Calculation 🆕

**Core Feature: Activations = k × SFT Activations**, where k is the preference group size

```
GRPO Activations = k × SFT Activations
Where k = numGenerations (preference group size)

Comparison:
- SFT: Activations = 1 × base
- DPO: Activations ≈ 2 × base  
- GRPO(k=4): Activations = 4 × base
- GRPO(k=8): Activations = 8 × base

Typically uses PEFT methods:
- Model Weights: INT4 quantization (8x compression)
- P_train = 1% × P_total (LoRA etc.)
- VRAM Bottleneck: Activations component
```

### 5. Multimodal VRAM Calculation 🆕

**Core: Total_Sequence_Length determines activation VRAM**

```
Total_Sequence_Length = Text Tokens + Image Patches + Audio Patches + Video Patches

Where:
- Image Sequence Length = (resolution/patch_size)² × number_of_images
- Video Sequence Length = frames × patches_per_frame (source of sequence length explosion)
- Audio Sequence Length = duration(ms) / 80ms

Activation VRAM = batch_size × Total_Sequence_Length × hidden_size × layers × precision_bytes
```

#### Precision Bytes Reference Table
| Precision Type | Bytes | Description |
|----------------|-------|-------------|
| FP32 | 4 | Single precision float |
| FP16/BF16 | 2 | Half precision float |
| INT8 | 1 | 8-bit integer quantization (4x compression) |
| INT4 | 0.5 | 4-bit integer quantization (8x compression) |

#### Quantization Ratio Reference Table
| Quantization Type | Compression Ratio | VRAM Savings |
|-------------------|-------------------|--------------|
| None | 1.0 | 0% |
| INT8 | 0.25 | 75% |
| INT4 | 0.125 | 87.5% |

## 🚀 Quick Start

### Requirements
- Node.js 18+
- npm or yarn

### Installation Steps

```bash
# Clone repository
git clone https://github.com/st-lzh/vram-wuhrai.git
cd vram-wuhrai

# Install dependencies
npm install

# Start development server
npm run dev

# Build production version
npm run build

# Start production server
npm start
```

Visit http://localhost:3000 to view the application

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. Create `docker-compose.yml`:

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

  # Optional: Nginx reverse proxy
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

2. Start services:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Docker Build

```bash
# Build image
docker build -t vram-calculator .

# Run container
docker run -d \
  --name vram-calculator \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  vram-calculator
```

### Performance Optimization Configuration

- **First Load**: 178KB (Ultimate optimization)
- **Code Splitting**: Lazy loading all calculator components
- **PWA Cache**: Offline available
- **Web Worker**: Background computation without blocking UI

### Kubernetes Deployment

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

## 📁 Project Structure

```
ai-memory-calculator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main page (secondary tab layout)
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── calculators/       # Calculator components
│   │   │   ├── inference-calculator.tsx      # Inference calculator
│   │   │   ├── fine-tuning-calculator.tsx    # Fine-tuning calculator  
│   │   │   ├── training-calculator.tsx       # Training calculator
│   │   │   ├── grpo-calculator.tsx          # GRPO calculator
│   │   │   └── multimodal-calculator.tsx    # Multimodal calculator
│   │   ├── ui/               # UI components
│   │   └── ...
│   ├── hooks/                # Custom Hooks
│   ├── lib/                  # Utility libraries
│   │   └── models-data.ts    # 70+ model database + architecture classification
│   ├── store/                # Zustand state management
│   ├── types/                # TypeScript types
│   └── utils/                # Utility functions
│       └── memory-formulas.ts # Unified LLM framework calculation formulas
├── public/                   # Static assets
│   ├── workers/             # Web Workers
│   └── ...
├── docs/                    # Detailed documentation
│   ├── memory-calculation-formulas.md # Calculation formula details
│   └── deployment.md       # Deployment guide
├── docker-compose.yml       # Docker orchestration
├── Dockerfile              # Docker image
├── next.config.ts         # Next.js configuration
└── package.json          # Project configuration
```

## 📚 API Documentation

### Health Check

```http
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "uptime": 3600
}
```

### Performance Analytics

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

## 🤖 MCP Protocol Support

This project supports [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), enabling AI assistants to directly call VRAM calculation functions through a standardized protocol.

### MCP Server Information

- **Server Name**: `vram-calculator-mcp-server`
- **Protocol Version**: `2024-11-05`
- **Endpoint**: `http://localhost:3001/api/mcp`

### Supported Features

#### 📚 Resources
- **Model Database**: 130+ pre-trained model information
- **GPU Specifications**: 20+ GPU detailed specs and pricing
- **Calculation Formulas**: VRAM calculation formula documentation
- **History Records**: Calculation history and statistics

#### 🔨 Tools
- **VRAM Calculation**: Inference, training, fine-tuning, GRPO, multimodal calculations
- **GPU Recommendation**: Intelligent GPU recommendations and cost analysis
- **Configuration Optimization**: Automatic configuration tuning and optimization suggestions

#### 💬 Prompts
- **Optimization Advice**: Professional VRAM optimization suggestions
- **GPU Selection**: GPU selection guidance
- **Technical Diagnosis**: Problem diagnosis and solutions

### Quick Start

#### 1. Start MCP Server
```bash
npm run dev
# MCP endpoint: http://localhost:3001/api/mcp
```

#### 2. Connection Test
```bash
curl -X POST http://localhost:3001/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": {"name": "test-client", "version": "1.0.0"}
    },
    "id": 1
  }'
```

#### 3. Call GPU Recommendation Tool
```bash
curl -X POST http://localhost:3001/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "recommend_gpu",
      "arguments": {"vramRequired": 16, "useCase": "training"}
    },
    "id": 2
  }'
```

### AI Assistant Integration Example

```javascript
// Initialize MCP connection
const mcpClient = new MCPClient('http://localhost:3001/api/mcp');
await mcpClient.initialize();

// Get GPU recommendations
const recommendation = await mcpClient.callTool('recommend_gpu', {
  vramRequired: 24,
  useCase: 'training'
});

// Read model information
const models = await mcpClient.readResource('models://nlp');
```

### Detailed Documentation

- 📖 [MCP Implementation Summary](./MCP_IMPLEMENTATION_SUMMARY.md)
- 🎯 [MCP Usage Examples](./MCP_USAGE_EXAMPLES.md)
- 🧪 [Test Script](./test-mcp.js)

## 🤝 Contributing

We welcome all forms of contributions!

### How to Contribute

1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Standards

- Follow TypeScript and React best practices
- Use ESLint and Prettier to maintain consistent code style
- Write clear commit messages
- Add tests for new features
- Update relevant documentation

### Calculation Formula Contributions

If you find calculation formula issues or want to add new algorithm support:
1. Describe the problem or requirement in Issues
2. Provide relevant papers or technical documentation
3. Provide reference implementation if possible

### Report Issues

Use GitHub Issues to report problems, please include:
- Problem description
- Reproduction steps
- Expected behavior
- Screenshots (if applicable)
- Environment information

## 🏆 Future Development Goals

### Short-term Goals (2025 Q1-Q2)

#### 🔧 Technical Enhancement
- **Model Support Expansion**
  - Add 50+ latest LLM support (GPT-4o, Claude-3.5, Gemini-2.0)
  - Support new Chinese models (Kimi-k1, Doubao-pro, etc.)
  - Integrate latest multimodal models (GPT-4V, Gemini-Vision)

- **Calculation Precision Improvement**
  - Implement distributed training VRAM calculation (multi-node, multi-GPU)
  - Add memory optimization algorithms (gradient accumulation, mixed precision)
  - Support new training paradigms (MoE training, sparse training)

- **Performance Optimization**
  - Reduce first load time to under 100KB
  - Implement advanced caching strategies
  - Add calculation result prediction cache

#### 🎨 User Experience Enhancement
- **Interactive Features**
  - Real-time calculation result comparison
  - VRAM usage timeline visualization
  - Interactive GPU selection wizard

- **Advanced Analytics**
  - Cost analysis calculator (GPU rental costs)
  - Training time estimation
  - Power consumption calculation

### Medium-term Goals (2025 Q3-Q4)

#### 🚀 Platform Integration
- **API Services**
  - RESTful API for third-party integration
  - Developer CLI tools
  - GitHub Action integration for CI/CD

- **Enterprise Features**
  - Multi-user workspace support
  - Calculation result export (PDF, Excel)
  - Custom model database management

#### 🌍 Community Building
- **Internationalization**
  - Support for 10+ languages
  - Regional model databases (Japan, Europe, etc.)
  - UI/UX cultural adaptation

- **Documentation & Education**
  - Interactive tutorials for beginners
  - Video course series
  - Technical blog articles

### Long-term Vision (2026+)

#### 🔬 Research & Innovation
- **AI-Driven Features**
  - Intelligent model recommendation based on task requirements
  - Automatic optimization suggestions
  - Machine learning predictive VRAM analysis

- **Advanced Computing Support**
  - Quantum computing VRAM estimation
  - Edge device deployment calculation
  - Federated learning resource estimation

#### 🌐 Ecosystem Development
- **Platform Ecosystem**
  - Custom calculator plugin system
  - Major cloud platform integration (AWS, Azure, GCP)
  - Mobile application development (iOS, Android)

- **Research Collaboration**
  - Academic institution partnerships
  - VRAM research open datasets
  - VRAM calculation methodology standardization

### 📈 Metrics & Goals

#### Performance Goals
- **Load Time**: <100KB first load by Q2 2025
- **Accuracy**: 95%+ calculation accuracy for mainstream models
- **Coverage**: Support 200+ models by end of 2025

#### Community Goals
- **Users**: 10,000+ monthly active users by end of 2025
- **Contributors**: 50+ open-source contributors
- **Documentation**: 100+ technical articles and tutorials

#### Technical Debt & Maintenance
- **Code Quality**: Maintain 95%+ test coverage
- **Security**: Regular security audits and updates
- **Dependencies**: Keep all dependencies up-to-date
- **Compatibility**: Support latest web standards and frameworks

### 🤝 How to Participate

We welcome contributions in various areas:

1. **Development**: Contribute core features and bug fixes
2. **Documentation**: Help improve and translate documentation
3. **Research**: Contribute to calculation formula accuracy
4. **Community**: Help answer questions and support users
5. **Testing**: Help identify and report issues

Join our [GitHub Discussions](https://github.com/st-lzh/vram-wuhrai/discussions) to participate in feature planning and technical discussions.

## 🏆 Changelog

### v2.0.0 (2024-06-23) 🎉
- ✨ **Added Multimodal Model Support**: Independent grouping supporting text+image+audio+video
- ✨ **Added GRPO Algorithm Calculation**: Correctly reflects k-fold activation value effect of preference group size
- 🔧 **Refactored Calculation Formulas**: Based on unified LLM framework, all formulas unified to standard
- 🎯 **Optimized Tab Order**: Inference→Fine-tuning→Training→GRPO, aligned with usage frequency
- 🎨 **Smart Model Classification**: Complete isolation between NLP and multimodal models
- 📈 **Expanded Model Database**: Added Chinese open-source models and multimodal models, total 100+ models
- 🚀 **Performance Optimization**: First load optimized to 178KB

### v1.0.0 (2024-01-01)
- 🎉 Initial release
- Support for training, inference, fine-tuning modes
- 50+ NLP model support
- GPU recommendation system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Thanks to all contributors
- VRAM calculation formulas based on community best practices
- Uses excellent open-source projects: Next.js, React, Tailwind CSS, etc.

## 📞 Contact Us

- Blog: [https://wuhrai.com](https://wuhrai.com)
- Model API: [https://ai.wuhrai.com](https://ai.wuhrai.com)
- Model Chat: [https://gpt.wuhrai.com](https://gpt.wuhrai.com)
- Email: 1139804291@qq.com
- GitHub: [@wuhr-ai](https://github.com/wuhr-ai)

---

<div align="center">
  Made with ❤️ by Wuhr AI Team
</div>

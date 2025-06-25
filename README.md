Of course, here is the professionally translated English version of your document, tailored for the AI and Large Model developer community. I have focused on using standard industry terminology and ensuring the tone is appropriate for a technical audience.

Wuhr AI VRAM Insight
<div align="center">
<h1>🧠 AI VRAM Calculator</h1>
<p>A Professional VRAM Calculator for Large Language and Multimodal Models</p>


![alt text](https://img.shields.io/badge/license-MIT-blue.svg)


![alt text](https://img.shields.io/badge/Next.js-15.3-black)


![alt text](https://img.shields.io/badge/TypeScript-5.0-blue)


![alt text](https://img.shields.io/badge/React-19.0-blue)

Live Demo | Report an Issue | Feature Request | GitHub | Blog

</div>

📖 Language

English | 中文

📖 Table of Contents

Features

What's New

Tech Stack

VRAM Calculation Formulas

Supported Models

Quick Start

Docker Deployment

Project Structure

API Documentation

Contributing Guidelines

License

🖼️ Demo Screenshots
Main Interface - Training VRAM Calculation

![alt text](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v2/vram-v2-1.png)

A professional interface for training VRAM calculation, supporting configurations for model parameters, batch size, sequence length, precision, and providing real-time VRAM requirements and GPU recommendations.

Single-Card GPU Recommendation System

![alt text](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v2/vram-v2-02.png)

Multi-Node, Multi-GPU Recommendation System

![alt text](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v2/vram-v2-03.png)

Intelligent GPU recommendation system that automatically matches the most suitable GPUs based on computational needs, including utilization analysis and price comparison.

✨ Features
🆕 What's New

🔥 Multimodal Model Support: Added a dedicated multimodal model group, supporting text, image, audio, and video combinations.

⚡ GRPO Algorithm Calculation: Support for VRAM calculation for Group-wise Ranking Preference Optimization.

📊 Smart Tab Sorting: Inference → Fine-tuning → Training → GRPO, ordered by common usage frequency.

🎯 Intelligent Model Categorization: NLP and Multimodal models are now displayed in separate, isolated groups.

📈 Corrected Calculation Formulas: All formulas have been rewritten based on a general-purpose LLM framework.

Core Features

🎯 Five Calculation Modes: Inference, Fine-tuning, Training, GRPO, and Multimodal.

📊 Accurate Calculation: VRAM calculation formulas based on the latest engineering practices and general-purpose LLM frameworks.

🎨 Visualized Breakdown: Pie chart illustrating VRAM composition for an intuitive understanding of each component's share.

💾 Calculation History: Automatically saves calculation history, enabling comparison and analysis.

🔧 Configuration Presets: 12+ preset templates to quickly start your calculations.

📱 Responsive Design: Seamless experience on both mobile and desktop devices.

Advanced Features

🌙 Dark Mode: Protect your eyes with a theme that follows your system's settings.

⚡ PWA Support: Installable as a native app for offline usage.

🔗 Result Sharing: Generate shareable links and export calculation reports.

⌨️ Keyboard Shortcuts: Boost your productivity with keyboard navigation.

📈 Performance Monitoring: Real-time monitoring of application performance.

🛡️ Robust Error Handling: Smart error messages and recovery mechanisms.

Data Support

130+ Pre-trained Models: Covering major Chinese and international open-source models with intelligent categorization.

22+ Multimodal Models: Including Qwen2.5-VL, QwQ-VL, LLaVA, Whisper, and more.

12+ Embedding Models: Support for Qwen3-Embedding and Qwen3-Reranker series.

20+ GPU Specifications: From consumer-grade to data center-grade, including the latest RTX 50 series.

Intelligent Recommendations: Recommends suitable GPUs based on VRAM requirements.

Price Analysis: Cost-performance comparison for different GPUs.

🛠 Tech Stack

Framework: Next.js 15.3 + React 19

Language: TypeScript 5.0

Styling: Tailwind CSS + Glassmorphism Design

State Management: Zustand

Animation: Framer Motion

Charts: Recharts

Tooling: ESLint, Prettier, Husky

📚 Supported Models
🤖 NLP/Language Models (95+)
Qwen Series

Qwen2.5: 0.5B, 1.5B, 3B, 7B, 14B, 32B, 72B

Qwen3: 1.8B, 7B, 14B, 32B, 72B

DeepSeek Series

DeepSeek-V3-671B (Full MoE, 37B activated)

DeepSeek-V3-0324 (Latest optimized version)

DeepSeek-R1-671B (Full inference model)

DeepSeek-R1-0528 (Latest inference model, 685B params)

deepseek-ai/DeepSeek-R1-0528 (Official Hugging Face version)

deepseek-ai/DeepSeek-R1-0528-Qwen3-8B (8B inference model based on Qwen3)

DeepSeek-R1 Series: 1.5B, 7B, 8B, 14B, 32B, 70B

DeepSeek-Coder: 1.3B, 6.7B, 33B

DeepSeek-MoE-16B

Llama Series

Llama-3.1: 8B, 70B, 405B

Llama-2: 7B, 13B, 70B

ChatGLM Series

GLM-4-Plus (100B, Zhipu's latest LLM)

GLM-Z1-32B (Inference model, comparable to OpenAI o1)

GLM-4-9B, ChatGLM3-6B, ChatGLM4-9B

Yi Series (01.AI)

Yi-Lightning (1000B MoE, 50B activated)

Yi-Large (100B)

Yi-Medium (200B MoE, 20B activated)

Yi-6B, Yi-34B

Other Chinese Open-Source Models

Qwen3 Series: 1.8B, 7B, 14B, 32B, 72B (Alibaba's latest)

Qwen3-Embedding: 0.6B, 4B, 8B (Embedding models)

Qwen3-Reranker: 0.6B, 4B, 8B (Reranker models)

MiniMax-ABAB6.5: 70B, 100B (Mianbi Intelligence)

Moonshot-v1: 32K/128K (Moonshot AI)

Step-1V (300B Multimodal), Step-2 (800B MoE) (Step-Star)

InternLM2.5: 7B, 20B (SenseTime)

Spark-Max (340B MoE), Spark-Pro (175B) (iFLYTEK)

Baichuan2: 7B, 13B

International Mainstream Models

Mistral-7B, Mixtral-8x7B

Gemma: 2B, 7B

Phi-3: Mini(3.8B), Small(7B)

CodeLlama: 7B, 13B, 34B

🎨 Multimodal Models (22+) 🆕
Vision-Language Models

Qwen2.5-VL Series: 3B, 7B, 32B, 72B

QwQ-VL-72B: Multimodal inference model with strong visual reasoning capabilities

LLaVA Series: 1.5-7B, 1.5-13B, NeXT-34B

Idefics2-8B: High-quality visual understanding

Audio Models

Whisper Series: Large-v3, Medium, Small

OpenOmni-7B: Multimodal dialogue

Video Understanding Models

Video-LLaMA-7B: Video content understanding

Jamba-1.5-Mini: Document and video understanding

Multimodal Dialogue Models

Phi-4-Multimodal: Microsoft's latest multimodal model

Nougat-Base: Specialized for document understanding

🔍 Embedding Models (12+) 🆕
Qwen Embedding Model Series

Qwen3-Embedding: 0.6B, 4B, 8B (Text embedding)

Qwen3-Reranker: 0.6B, 4B, 8B (Document reranking)

🎯 Intelligent Model Categorization

NLP Group: Displays only text-based models with transformer, glm, or moe architectures.

Multimodal Group: Displays only multimodal models with multimodal architecture.

Complete Separation: Avoids confusion in model selection and enhances user experience.

📐 VRAM Calculation Formulas

Accurate calculation formulas based on general-purpose LLM frameworks and the latest engineering practices:

🔬 General LLM Framework
Generated code
Total VRAM = Model Weights + Optimizer States + Gradients + Activations + Other Overhead


All calculators adhere to this framework, with the key difference being the value of P_train (Number of Trainable Parameters).

1. Inference VRAM Calculation
Generated code
Total VRAM = Quantized Model Weights + KV Cache + Activations (minimal)

Where:
- Quantized Model Weights = P_total × bytes_per_parameter × quantization_ratio
- KV Cache = batch_size × seq_len × hidden_size × num_layers × 2 × bytes_per_parameter
- Activations = ~10% of training activations (much smaller during inference)
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END
2. Fine-tuning VRAM Calculation
Full Fine-tuning
Generated code
P_train = P_total (gradients are required for all parameters)
Total VRAM = Model Weights + (P_train × optimizer_factor) + (P_train × gradient_precision_bytes) + Activations
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END
PEFT Methods (LoRA/QLoRA/Prefix-Tuning)
Generated code
P_train << P_total (gradients are required for only a small subset of parameters)

LoRA: P_train = calculateLoRAParams(rank), typically ~1% of total parameters
QLoRA: Base model is quantized + LoRA parameters
Prefix-Tuning: P_train ≈ 1% × P_total
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END
3. Training VRAM Calculation
Generated code
P_train = P_total (Full parameter training)
Total VRAM = Model Weights + Optimizer States + Gradients + Activations + Other Overhead

Where:
- Optimizer States = P_total × 4 bytes × optimizer_factor (SGD=1, AdamW=2)
- Gradients = P_total × training_precision_bytes
- Activations: Supports Gradient Checkpointing (reduces memory by ~70%)
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END
4. GRPO VRAM Calculation 🆕

Key Characteristic: Activations = k × SFT Activations, where k is the preference group size.

Generated code
GRPO Activations = k × SFT Activations
Where k = numGenerations (preference group size)

Comparison:
- SFT: Activations = 1 × base
- DPO: Activations ≈ 2 × base
- GRPO(k=4): Activations = 4 × base
- GRPO(k=8): Activations = 8 × base

Typically used with PEFT methods:
- Model Weights: INT4 quantization (8x compression)
- P_train = 1% × P_total (LoRA, etc.)
- VRAM Bottleneck: The Activations component
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END
5. Multimodal VRAM Calculation 🆕

Core Concept: Total_Sequence_Length determines Activation memory.

Generated code
Total_Sequence_Length = Text Tokens + Image Patches + Audio Patches + Video Patches

Where:
- Image Sequence Length = (Resolution / patch_size)² × num_images
- Video Sequence Length = num_frames × patches_per_frame (the primary cause of sequence length explosion)
- Audio Sequence Length = duration(ms) / 80ms

Activation Memory = batch_size × Total_Sequence_Length × hidden_size × num_layers × bytes_per_parameter
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END
Precision to Bytes Mapping
Precision Type	Bytes	Description
FP32	4	Single-precision floating-point
FP16/BF16	2	Half-precision floating-point
INT8	1	8-bit integer quantization (4x compression)
INT4	0.5	4-bit integer quantization (8x compression)
Quantization Ratio Mapping
Quantization Type	Compression Ratio	VRAM Savings
None	1.0	0%
INT8	0.25	75%
INT4	0.125	87.5%
🚀 Quick Start
Prerequisites

Node.js 18+

npm or yarn

Installation
Generated bash
# Clone the repository
git clone https://github.com/st-lzh/vram-wuhrai.git
cd vram-wuhrai

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm start
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Access the application at http://localhost:3000

🐳 Docker Deployment
Using Docker Compose (Recommended)

Create docker-compose.yml:

Generated yaml
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
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Yaml
IGNORE_WHEN_COPYING_END

Start the services:

Generated bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
Using Docker Build
Generated bash
# Build the image
docker build -t vram-calculator .

# Run the container
docker run -d \
  --name vram-calculator \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  vram-calculator
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
Performance Optimizations

Initial Load: 178KB (highly optimized)

Code Splitting: All calculator components are lazy-loaded.

PWA Caching: Available for offline use.

Web Workers: Background computations to keep the UI responsive.

Kubernetes Deployment
Generated yaml
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
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Yaml
IGNORE_WHEN_COPYING_END
📁 Project Structure
Generated code
ai-memory-calculator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root Layout
│   │   ├── page.tsx           # Main Page (Nested Tab Layout)
│   │   └── api/               # API Routes
│   ├── components/            # React Components
│   │   ├── calculators/       # Calculator Components
│   │   │   ├── inference-calculator.tsx      # Inference Calculator
│   │   │   ├── fine-tuning-calculator.tsx    # Fine-tuning Calculator  
│   │   │   ├── training-calculator.tsx       # Training Calculator
│   │   │   ├── grpo-calculator.tsx          # GRPO Calculator
│   │   │   └── multimodal-calculator.tsx    # Multimodal Calculator
│   │   ├── ui/               # UI Components (Shadcn/UI, etc.)
│   │   └── ...
│   ├── hooks/                # Custom Hooks
│   ├── lib/                  # Library code
│   │   └── models-data.ts    # 130+ Model database w/ architecture classification
│   ├── store/                # Zustand State Management
│   ├── types/                # TypeScript Types
│   └── utils/                # Utility Functions
│       └── memory-formulas.ts # General LLM framework calculation formulas
├── public/                   # Static Assets
│   ├── workers/             # Web Workers
│   └── ...
├── docs/                     # Detailed Documentation
│   ├── memory-calculation-formulas.md # In-depth formula explanations
│   └── deployment.md       # Deployment Guide
├── docker-compose.yml        # Docker Compose file
├── Dockerfile                # Dockerfile
├── next.config.ts          # Next.js Configuration
└── package.json            # Project Configuration
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END
📚 API Documentation
Health Check
Generated http
GET /api/health
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Http
IGNORE_WHEN_COPYING_END

Response:

Generated json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "uptime": 3600
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Json
IGNORE_WHEN_COPYING_END
Performance Analytics
Generated http
POST /api/analytics
Content-Type: application/json

{
  "event": "calculation",
  "type": "training",
  "duration": 150,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Http
IGNORE_WHEN_COPYING_END
🤝 Contributing Guidelines

We welcome all forms of contribution!

How to Contribute

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

Development Standards

Follow TypeScript and React best practices.

Use ESLint and Prettier to maintain consistent code style.

Write clear and concise commit messages.

Add tests for new features.

Update relevant documentation.

Formula Contributions

If you find an issue with a calculation formula or want to add support for a new algorithm:

Open an issue describing the problem or proposal.

Provide links to relevant papers or technical documentation.

If possible, provide a reference implementation.

Reporting Issues

Please use GitHub Issues to report bugs. Include:

A clear description of the issue.

Steps to reproduce.

Expected behavior.

Screenshots (if applicable).

Environment details.

🏆 Roadmap
Short-term Goals (Q1-Q2 2025)
🔧 Technical Enhancements

Expanded Model Support

Add 50+ new LLMs (e.g., GPT-4o, Claude-3.5, Gemini-2.0).

Support new Chinese models (e.g., Kimi-k1, Doubao-pro).

Integrate latest multimodal models (e.g., GPT-4V, Gemini-Vision).

Improved Calculation Accuracy

Implement distributed training VRAM calculation (multi-node, multi-GPU).

Add memory optimization techniques (gradient accumulation, mixed precision).

Support new training paradigms (MoE training, sparse training).

Performance Optimization

Reduce initial load time to under 100KB.

Implement advanced caching strategies.

Add predictive caching for calculation results.

🎨 User Experience Enhancements

Interactive Features

Real-time comparison of calculation results.

VRAM usage timeline visualization.

Interactive GPU selection wizard.

Advanced Analysis

Cost analysis calculator (GPU rental costs).

Training time estimation.

Power consumption calculation.

Mid-term Goals (Q3-Q4 2025)
🚀 Platform Integration

API Services

RESTful API for third-party integration.

Developer CLI tool.

GitHub Action for CI/CD integration.

Enterprise Features

Multi-user workspace support.

Export calculation results (PDF, Excel).

Custom model database management.

🌍 Community Building

Internationalization

Support for 10+ languages.

Regional model databases (Japan, Europe, etc.).

UI/UX cultural adaptation.

Documentation & Education

Interactive tutorials for beginners.

Video course series.

Technical blog posts.

Long-term Vision (2026+)
🔬 Research & Innovation

AI-Driven Features

Intelligent model recommendations based on task requirements.

Automated optimization suggestions.

Machine learning-based predictive VRAM analysis.

Advanced Computing Support

Quantum computing VRAM estimation.

Edge device deployment calculation.

Federated learning resource estimation.

🌐 Ecosystem Development

Platform Ecosystem

Custom calculator plugin system.

Integration with major cloud platforms (AWS, Azure, GCP).

Mobile app development (iOS, Android).

Research Collaboration

Partnerships with academic institutions.

Open datasets for VRAM research.

Standardization of VRAM calculation methodologies.

📈 Metrics & Targets
Performance Targets

Load Time: <100KB initial load by Q2 2025.

Accuracy: 95%+ calculation accuracy for mainstream models.

Coverage: Support for 200+ models by end of 2025.

Community Targets

Users: 10,000+ monthly active users by end of 2025.

Contributors: 50+ open-source contributors.

Documentation: 100+ technical articles and tutorials.

Technical Debt & Maintenance

Code Quality: Maintain 95%+ test coverage.

Security: Regular security audits and updates.

Dependencies: Keep all dependencies up-to-date.

Compatibility: Support the latest web standards and frameworks.

🤝 How to Get Involved

We welcome contributions in all areas:

Development: Contribute to core features and bug fixes.

Documentation: Help improve and translate documentation.

Research: Contribute to the accuracy of calculation formulas.

Community: Help answer questions and support users.

Testing: Help identify and report issues.

Join our GitHub Discussions to participate in feature planning and technical discussions.

🏆 Changelog
v2.0.0 (2024-06-23) 🎉

✨ New Feature: Multimodal Model Support: Dedicated group for models handling text, image, audio, and video.

✨ New Feature: GRPO Algorithm Calculation: Accurately reflects the k-factor activation memory impact from preference group size.

🔧 Refactor: Calculation Formulas: All formulas standardized based on a general-purpose LLM framework.

🎯 Optimization: Tab Order: Reordered to Inference → Fine-tuning → Training → GRPO for better workflow.

🎨 Feature: Intelligent Model Categorization: NLP and multimodal models are now completely separated.

📈 Expansion: Model Database: Added new Chinese open-source and multimodal models, totaling over 100.

🚀 Optimization: Performance: Initial page load optimized to 178KB.

v1.0.0 (2024-01-01)

🎉 Initial release.

Support for Training, Inference, and Fine-tuning modes.

50+ NLP models supported.

GPU recommendation system.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgements

Thanks to all contributors.

VRAM calculation formulas are based on community best practices.

Built with amazing open-source projects like Next.js, React, and Tailwind CSS.

📞 Contact Us

Blog: https://wuhrai.com

Model API: https://ai.wuhrai.com

Model Chat: https://gpt.wuhrai.com

Email: 1139804291@qq.com

GitHub: @wuhr-ai

<div align="center">
Made with ❤️ by the Wuhr AI Team
</div>

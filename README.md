# Wuhr AI VRAM Insight

<div align="center">
  <h1>🧠 AI VRAM Calculator</h1>
  <p>Professional VRAM requirement calculation tool for Large Language Models and Multimodal Models</p>
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)
  
  [Live Demo](https://vram.wuhrai.com) | [Report Issues](https://github.com/st-lzh/vram-wuhrai/issues) | [Feature Requests](https://github.com/st-lzh/vram-wuhrai/issues) | [GitHub Source](https://github.com/st-lzh/vram-wuhrai.git) | [Blog](https://wuhrai.com)
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
- [Contributing](#-contributing)
- [Future Development Goals](#-future-development-goals)
- [License](#-license)

## ✨ Features

### 🆕 Version Highlights
- **🔥 Multimodal Model Support**: New independent multimodal grouping supporting text+image+audio+video combinations
- **⚡ GRPO Algorithm Calculation**: Support for Group-wise Ranking Preference Optimization VRAM calculation
- **📊 Intelligent Tab Sorting**: Inference→Fine-tuning→Training→GRPO, aligned with usage frequency
- **🎯 Smart Model Classification**: Complete separation of NLP and multimodal model displays
- **📈 Correct Calculation Formulas**: All calculation formulas rewritten based on universal LLM framework

### Core Features
- **🎯 Five Calculation Modes**: Inference, Fine-tuning, Training, GRPO, Multimodal
- **📊 Precise Calculations**: VRAM calculation formulas based on latest engineering practices and universal LLM framework
- **🎨 Visual Display**: Pie charts showing VRAM composition for intuitive understanding of component ratios
- **💾 History Records**: Automatic calculation history saving with comparison analysis support
- **🔧 Configuration Presets**: 12+ preset templates for quick calculation start
- **📱 Responsive Design**: Perfect adaptation for mobile and desktop devices

### Advanced Features
- **🌙 Dark Mode**: Eye protection with system theme following support
- **⚡ PWA Support**: Installable as local application with offline usage support
- **🔗 Result Sharing**: Generate sharing links and export calculation reports
- **⌨️ Keyboard Shortcuts**: Improve operational efficiency
- **📈 Performance Monitoring**: Real-time application performance monitoring
- **🛡️ Error Handling**: Intelligent error prompts and recovery

### Data Support
- **130+ Pre-trained Models**: Covering mainstream Chinese and international open-source models with intelligent classification
- **22+ Multimodal Models**: Supporting Qwen2.5-VL, QwQ-VL, LLaVA, Whisper, etc.
- **12+ Vector Models**: Supporting Qwen3-Embedding, Qwen3-Reranker series
- **20+ GPU Specifications**: From consumer-grade to data center-grade, including latest RTX 50 series
- **Intelligent Recommendations**: Recommend suitable GPUs based on VRAM requirements
- **Price Analysis**: GPU cost-effectiveness comparison

## 🛠 Tech Stack

- **Framework**: Next.js 15.3 + React 19
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS + Glassmorphism Design
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Tools**: ESLint, Prettier, Husky

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

## 🏆 Future Development Goals

### Short-term Goals (Q1-Q2 2025)

#### 🔧 Technical Enhancement
- **Model Support Expansion**
  - Add support for 50+ latest LLMs (GPT-4o, Claude-3.5, Gemini-2.0)
  - Support for new Chinese models (Kimi-k1, Doubao-pro, etc.)
  - Integration of latest multimodal models (GPT-4V, Gemini-Vision)

- **Calculation Accuracy Improvement**
  - Implement distributed training VRAM calculation (multi-node, multi-GPU)
  - Add memory optimization algorithms (gradient accumulation, mixed precision)
  - Support for new training paradigms (MoE training, sparse training)

- **Performance Optimization**
  - Reduce first load time to under 100KB
  - Implement advanced caching strategies
  - Add calculation result predictive caching

#### 🎨 User Experience Enhancement
- **Interactive Features**
  - Real-time calculation result comparison
  - VRAM usage timeline visualization
  - Interactive GPU selection wizard

- **Advanced Analytics**
  - Cost analysis calculator (GPU rental costs)
  - Training time estimation
  - Power consumption calculation

### Medium-term Goals (Q3-Q4 2025)

#### 🚀 Platform Integration
- **API Services**
  - RESTful API for third-party integration
  - CLI tool for developers
  - GitHub Action for CI/CD integration

- **Enterprise Features**
  - Multi-user workspace support
  - Calculation result export (PDF, Excel)
  - Custom model database management

#### 🌍 Community Building
- **Internationalization**
  - Support for 10+ languages
  - Regional model database (Japan, Europe, etc.)
  - Cultural adaptation of UI/UX

- **Documentation & Education**
  - Interactive tutorials for beginners
  - Video course series
  - Technical blog articles

### Long-term Vision (2026+)

#### 🔬 Research & Innovation
- **AI-Powered Features**
  - Intelligent model recommendation based on task requirements
  - Automatic optimization suggestions
  - Predictive VRAM analysis using machine learning

- **Advanced Calculation Support**
  - Quantum computing VRAM estimation
  - Edge device deployment calculation
  - Federated learning resource estimation

#### 🌐 Ecosystem Development
- **Platform Ecosystem**
  - Plugin system for custom calculators
  - Integration with major cloud platforms (AWS, Azure, GCP)
  - Mobile app development (iOS, Android)

- **Research Collaboration**
  - Partnership with academic institutions
  - Open dataset for VRAM research
  - Standardization of VRAM calculation methodologies

### 📈 Metrics & Goals

#### Performance Targets
- **Load Time**: <100KB first load by Q2 2025
- **Accuracy**: 95%+ calculation accuracy for mainstream models
- **Coverage**: Support 200+ models by end of 2025

#### Community Targets
- **Users**: 10,000+ monthly active users by end of 2025
- **Contributors**: 50+ open source contributors
- **Documentation**: 100+ technical articles and tutorials

#### Technical Debt & Maintenance
- **Code Quality**: Maintain 95%+ test coverage
- **Security**: Regular security audits and updates
- **Dependencies**: Keep all dependencies up-to-date
- **Compatibility**: Support latest web standards and frameworks

### 🤝 How to Get Involved

We welcome contributions in all areas:

1. **Development**: Contribute to core features and bug fixes
2. **Documentation**: Help improve and translate documentation
3. **Research**: Contribute to calculation formula accuracy
4. **Community**: Help answer questions and support users
5. **Testing**: Help identify and report issues

Join our [GitHub Discussions](https://github.com/st-lzh/vram-wuhrai/discussions) to participate in feature planning and technical discussions.

## 📞 Contact Us

- Blog: [https://wuhrai.com](https://wuhrai.com)
- Model API: [https://ai.wuhrai.com](https://ai.wuhrai.com)
- Model Chat: [https://gpt.wuhrai.com](https://gpt.wuhrai.com)
- Email: 1139804291@qq.com
- GitHub: [@st-lzh](https://github.com/st-lzh)

---

<div align="center">
  Made with ❤️ by Wuhr AI Team
</div>

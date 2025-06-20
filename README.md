# Wuhr AI VRAM Insight

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</div>

<div align="center">
  <h3>🚀 专业的AI模型显存计算器</h3>
  <p>支持训练、推理、微调三种模式，基于最新工程实践的精确计算公式</p>
  <p>
    <a href="#features">功能特性</a> •
    <a href="#demo">在线演示</a> •
    <a href="#quick-start">快速开始</a> •
    <a href="#deployment">部署指南</a> •
    <a href="#contributing">贡献指南</a>
  </p>
</div>

## ✨ Features

### 🧮 核心功能
- **三种计算模式**：训练（Training）、推理（Inference）、微调（Fine-tuning）
- **50+ 主流模型**：支持 Qwen、DeepSeek、Llama、ChatGLM 等系列
- **20+ GPU规格**：从消费级 RTX 到数据中心 H100/H200
- **精确计算公式**：基于实际工程经验的显存计算算法

### 🎨 界面设计
- **苹果风格设计**：玻璃拟态 UI，精美的视觉效果
- **深色/浅色主题**：自适应系统主题，护眼模式
- **响应式布局**：完美支持桌面、平板、手机
- **流畅动画**：Framer Motion 驱动的交互动画

### 🔧 高级功能
- **历史记录**：自动保存计算历史，支持对比分析
- **配置预设**：12+ 常用场景预设模板
- **结果分享**：支持导出报告、生成分享链接
- **性能监控**：实时追踪应用性能指标
- **键盘快捷键**：提升操作效率

## 🖥️ Demo

在线演示：[https://vram.wuhr.ai](https://vram.wuhr.ai)

## 🚀 Quick Start

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 本地开发

```bash
# 克隆项目
git clone https://github.com/yourusername/wuhr-ai-vram-insight.git
cd wuhr-ai-vram-insight/ai-memory-calculator

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建生产版本

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

## 📦 Deployment

### Docker 部署（推荐）

使用 Docker Compose 一键部署：

```bash
# 使用 docker-compose
docker-compose up -d

# 或使用 docker build
docker build -t wuhr-ai-vram-insight .
docker run -p 3000:3000 wuhr-ai-vram-insight
```

详细部署文档请查看 [部署指南](./docs/deployment.md)

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/wuhr-ai-vram-insight)

### 其他平台

- [Railway 部署指南](./docs/deployment.md#railway)
- [Render 部署指南](./docs/deployment.md#render)
- [自建服务器部署](./docs/deployment.md#self-hosted)

## 🏗️ Tech Stack

- **框架**: [Next.js 15.3.4](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **状态管理**: [Zustand](https://zustand-demo.pmnd.rs/)
- **UI组件**: [Radix UI](https://www.radix-ui.com/)
- **图标**: [Lucide Icons](https://lucide.dev/)

## 📖 Documentation

- [使用指南](./docs/user-guide.md)
- [计算公式说明](./docs/formulas.md)
- [API 文档](./docs/api.md)
- [贡献指南](./CONTRIBUTING.md)

## 🤝 Contributing

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md) 了解如何参与项目。

### 贡献者

<a href="https://github.com/yourusername/wuhr-ai-vram-insight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourusername/wuhr-ai-vram-insight" />
</a>

## 📝 License

本项目基于 [MIT License](./LICENSE) 开源。

## 🙏 Acknowledgments

- 感谢所有模型和 GPU 制造商提供的技术规格
- 感谢开源社区的优秀项目和工具
- 特别感谢所有贡献者和用户的支持

## 📧 Contact

- 项目主页: [https://github.com/yourusername/wuhr-ai-vram-insight](https://github.com/yourusername/wuhr-ai-vram-insight)
- Issue反馈: [GitHub Issues](https://github.com/yourusername/wuhr-ai-vram-insight/issues)
- 邮箱: your-email@example.com

---

<div align="center">
  Made with ❤️ by Wuhr AI Team
</div>

# RP2040 GPIO Manager

<div align="center">

![RP2040](https://img.shields.io/badge/RP2040-Microcontroller-blue)
![React](https://img.shields.io/badge/React-18.0+-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green)

**专业的RP2040引脚管理系统 - 可视化配置、冲突检测、代码生成**

[在线演示](#) | [功能特性](#功能特性) | [快速开始](#快速开始) | [项目结构](#项目结构)

</div>

---

## 📖 项目简介

RP2040 GPIO Manager 是一个专为Raspberry Pi RP2040微控制器设计的现代化引脚管理系统。通过直观的可视化界面，帮助嵌入式开发者高效管理引脚分配、检测硬件冲突、优化资源使用，并自动生成初始化代码。

### 🎯 核心价值

- **可视化引脚管理** - 直观的RP2040芯片图形界面，实时显示引脚状态
- **多板卡支持** - 支持多种RP2040开发板配置，灵活切换
- **智能冲突检测** - 自动检测硬件、时序、功耗冲突
- **代码自动生成** - 支持C、Python、JavaScript代码生成
- **专业级功能** - 硬件抽象层、资源优化、可靠性分析

---

## ✨ 功能特性

### 🔧 核心功能
- **引脚可视化** - 实时显示RP2040引脚状态和分配情况
- **模块管理** - 支持多种外设模块配置（SPI、I2C、UART、GPIO等）
- **冲突检测** - 智能检测引脚冲突、时序冲突、功耗超限
- **代码生成** - 自动生成初始化代码（C/Python/JavaScript）
- **配置导入导出** - 支持JSON格式配置文件的导入导出

### 🎨 界面特性
- **响应式设计** - 完美适配2K/4K高分辨率屏幕
- **现代化UI** - 基于Ant Design 5.x的优雅界面
- **实时更新** - 动态加载不同板卡配置
- **交互友好** - 点击引脚查看详细信息，拖拽分配模块

### 📊 数据管理
- **多板卡支持** - 1号板、2号板、3号板配置
- **模块类型** - TFT-LCD、MicroSD、摇杆、放大器、麦克风、UART、按钮、IO扩展
- **接口支持** - SPI0/1、I2C0/1、UART0/1、I2S、PWM、ADC
- **状态监控** - 实时显示引脚使用率、功耗统计

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **操作系统** - Windows 10/11, macOS, Linux

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/pico-gpio-manager.git
cd pico-gpio-manager
```

2. **安装依赖**
```bash
# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd ../frontend
npm install
```

3. **启动开发服务器**

**方法一：手动启动**
```bash
# 启动后端服务器 (端口5000)
cd backend
npm run dev

# 启动前端服务器 (端口3000)
cd frontend
npm run dev
```

**方法二：使用批处理脚本 (Windows)**
```bash
# 启动前后端
start-dev.bat
```

4. **访问应用**
```
前端: http://localhost:3000
后端API: http://localhost:5000
```

### 生产部署

```bash
# 构建前端
cd frontend
npm run build

# 启动生产服务器
cd backend
npm run start
```

---

## 📁 项目结构

```
pico-gpio-manager/
├── frontend/                 # 前端React应用
│   ├── src/
│   │   ├── components/       # React组件
│   │   │   ├── common/       # 通用组件
│   │   │   ├── layout/       # 布局组件
│   │   │   ├── pins/         # 引脚相关组件
│   │   │   └── modules/      # 模块相关组件
│   │   ├── hooks/            # 自定义Hooks
│   │   ├── stores/           # Zustand状态管理
│   │   ├── services/         # 服务层
│   │   ├── types/            # TypeScript类型定义
│   │   └── utils/            # 工具函数
│   ├── public/               # 静态资源
│   └── package.json
├── backend/                  # 后端Node.js应用
│   ├── src/
│   │   ├── controllers/      # 控制器
│   │   ├── routes/           # 路由定义
│   │   ├── services/         # 服务层
│   │   ├── config/           # 配置文件
│   │   └── utils/            # 工具函数
│   ├── data/                 # 数据文件
│   │   ├── boards/           # 板卡配置
│   │   └── configs/          # 系统配置
│   └── package.json
├── docs/                     # 文档
├── scripts/                  # 脚本文件
└── README.md
```

---

## 🎮 使用指南

### 基本操作

1. **选择板卡版本**
   - 在顶部下拉菜单中选择对应的RP2040开发板版本
   - 系统会自动加载对应的引脚和模块配置

2. **查看引脚状态**
   - 左侧显示RP2040芯片图形界面
   - 绿色：可用引脚
   - 蓝色：已用引脚
   - 橙色：冲突引脚
   - 红色：关键引脚

3. **查看引脚详情**
   - 点击任意引脚查看详细信息
   - 右侧面板显示引脚功能、电压、状态、所属模块

4. **管理模块配置**
   - 右侧底部显示当前板卡的模块配置
   - 按类型分组显示（显示屏、存储卡、摇杆等）
   - 可查看模块的引脚分配、功耗信息

### 高级功能

- **引脚分配** - 拖拽方式分配引脚给模块
- **冲突检测** - 系统自动检测并提示冲突
- **代码生成** - 导出初始化代码
- **配置备份** - 导入导出配置文件

---

## 🔧 技术栈

### 前端技术
- **React 18** - 现代化UI框架
- **TypeScript** - 类型安全的JavaScript
- **Ant Design 5.x** - 企业级UI组件库
- **Zustand** - 轻量级状态管理
- **Vite** - 快速构建工具
- **Canvas API** - 引脚可视化渲染

### 后端技术
- **Node.js** - JavaScript运行时
- **Express** - Web应用框架
- **TypeScript** - 类型安全
- **JSON文件存储** - 轻量级数据存储
- **RESTful API** - 标准接口设计

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **ts-node-dev** - 开发环境热重载

---

## 📊 支持的板卡配置

### 1号板 - 多功能开发板
- **Quectel 4G-LTE模块** (UART0)
- **USB转TTL模块** (UART0)
- **TFT-LCD显示屏** (SPI0)
- **IO扩展接口** (I2C1)
- **总功耗**: 1419mW

### 2号板 - 游戏开发板
- **摇杆控制器** (I2C1)
- **MicroSD卡** (SPI0)
- **总功耗**: 264mW

### 3号板 - 音频开发板
- **功放模块** (I2S)
- **拾音器** (I2S)
- **UART通信** (UART0)
- **按键模块** (GPIO)
- **IO扩展** (I2C1)
- **总功耗**: 892mW

---

## 🔌 支持的接口类型

| 接口 | 描述 | 支持版本 |
|------|------|----------|
| SPI0/SPI1 | 串行外设接口 | 全支持 |
| I2C0/I2C1 | 双线串行总线 | 全支持 |
| UART0/UART1 | 通用异步收发器 | 全支持 |
| I2S0/I2S1 | 数字音频接口 | 全支持 |
| PWM | 脉冲宽度调制 | 全支持 |
| ADC | 模数转换器 | 全支持 |
| GPIO | 通用输入输出 | 全支持 |

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. **Fork项目**
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **创建Pull Request**

### 开发规范

- 遵循TypeScript编码规范
- 使用ESLint进行代码检查
- 提交信息使用约定式提交格式
- 新功能需要添加相应的测试

---

## 📝 更新日志

### v1.0.0 (2024-01-XX)
- ✨ 初始版本发布
- 🎨 现代化UI界面设计
- 🔧 多板卡配置支持
- 📊 引脚可视化功能
- 🚀 响应式布局优化

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

---

## 🙏 致谢

- [Raspberry Pi Foundation](https://www.raspberrypi.org/) - RP2040微控制器
- [Ant Design](https://ant.design/) - 优秀的UI组件库
- [React](https://reactjs.org/) - 强大的前端框架
- [Node.js](https://nodejs.org/) - 高效的JavaScript运行时

---

## 📞 联系我们

- **项目主页**: [GitHub Repository](#)
- **问题反馈**: [Issues](#)
- **功能建议**: [Discussions](#)
- **邮箱**: your-email@example.com

---

<div align="center">

**如果这个项目对您有帮助，请给个⭐️支持一下！**

Made with ❤️ for the RP2040 community

</div>

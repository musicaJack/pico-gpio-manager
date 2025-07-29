# RP2040 GPIO Manager

<div align="center">

![RP2040](https://img.shields.io/badge/RP2040-Microcontroller-blue)
![React](https://img.shields.io/badge/React-18.0+-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?logo=node.js)
![Docker](https://img.shields.io/badge/Docker-20.0+-2496ed?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

**Professional RP2040 Pin Management System - Visual Configuration, Conflict Detection, Code Generation**

[Live Demo](https://www.bedigital.cn/gpio-manager/) | [Features](#features) | [Quick Start](#quick-start) | [Deployment](#deployment)

</div>

---

## 📖 Project Overview

RP2040 GPIO Manager is a modern pin management system designed specifically for the Raspberry Pi RP2040 microcontroller. Through an intuitive visual interface, it helps embedded developers efficiently manage pin assignments, detect hardware conflicts, optimize resource usage, and automatically generate initialization code.

### 🎯 Core Value

- **Visual Pin Management** - Intuitive RP2040 chip graphical interface with real-time pin status
- **Multi-Board Support** - Support for various RP2040 development board configurations
- **Smart Conflict Detection** - Automatic detection of hardware, timing, and power conflicts
- **Code Generation** - Support for C, Python, JavaScript code generation
- **Professional Features** - Hardware abstraction layer, resource optimization, reliability analysis
- **Mobile Responsive** - Perfect support for mobile devices and tablets

---

## ✨ Features

### 🔧 Core Features
- **Pin Visualization** - Real-time display of RP2040 pin status and assignments
- **Module Management** - Support for various peripheral module configurations (SPI, I2C, UART, GPIO, etc.)
- **Conflict Detection** - Intelligent detection of pin conflicts, timing conflicts, and power limits
- **Code Generation** - Automatic generation of initialization code (C/Python/JavaScript)
- **Configuration Import/Export** - Support for JSON format configuration files
- **Multi-Board Switching** - Support for Board 1, Board 2, Board 3 configurations

### 🎨 Interface Features
- **Responsive Design** - Perfect adaptation for desktop, tablet, and mobile devices
- **Modern UI** - Elegant interface based on Ant Design 5.x
- **Real-time Updates** - Dynamic loading of different board configurations
- **User-friendly Interaction** - Click pins to view details, drag and drop module assignments
- **Mobile Optimization** - Touch-friendly mobile interface

### 📊 Data Management
- **Multi-Board Support** - Board 1, Board 2, Board 3 configurations
- **Module Types** - TFT-LCD, MicroSD, Joystick, Amplifier, Microphone, UART, Button, IO Expansion
- **Interface Support** - SPI0/1, I2C0/1, UART0/1, I2S, PWM, ADC
- **Status Monitoring** - Real-time display of pin usage and power statistics

---

## 🚀 Quick Start

### Requirements

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Operating System** - Windows 10/11, macOS, Linux

### Local Development

1. **Clone the project**
```bash
git clone https://github.com/your-username/pico-gpio-manager.git
cd pico-gpio-manager
```

2. **Install dependencies**
```bash
# Install all dependencies
npm run install:all
```

3. **Start development server**

**Method 1: Manual start**
```bash
# Start backend server (port 5000)
npm run dev:backend

# Start frontend server (port 3000)
npm run dev:frontend
```

**Method 2: Use batch script (Windows)**
```bash
# Start both frontend and backend
start-dev.bat
```

4. **Access the application**
```
Frontend: http://localhost:3000
Backend API: http://localhost:5000
```

### Production Deployment

```bash
# Build frontend
npm run build:frontend

# Start production server
npm run start:backend
```

---

## 🐳 Docker Deployment

### Quick Deployment

1. **Clone the project**
```bash
git clone <your-repository-url>
cd pico-gpio-manager
```

2. **Configure Nginx**
Add the configuration from `nginx-config-example.conf` to your Nginx configuration file.

3. **Deploy Docker services**
```bash
# Give execute permission to deployment script
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

4. **Restart Nginx**
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx
```

### Production Environment Deployment

1. **Server environment preparation**
```bash
# Download initialization script
wget https://raw.githubusercontent.com/your-repo/pico-gpio-manager/main/production-setup.sh
chmod +x production-setup.sh

# Run initialization
./production-setup.sh
```

2. **Download code and deploy**
```bash
cd /opt/gpio-manager
git clone <your-repository-url> .
chmod +x deploy-production.sh
./deploy-production.sh
```

### Docker Service Configuration

- **frontend**: Frontend service running on port 8080
- **backend**: Backend service running on port 8081
- **networks**: Custom network configuration
- **volumes**: Log and data persistence

### Access URLs

After deployment, you can access the application at:

- **Main Application**: https://www.bedigital.cn/gpio-manager/
- **API Interface**: https://www.bedigital.cn/gpio-manager/api/
- **Health Check**: https://www.bedigital.cn/gpio-manager/health

---

## 📁 Project Structure

```
pico-gpio-manager/
├── frontend/                 # Frontend React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── common/       # Common components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── pins/         # Pin-related components
│   │   │   └── modules/      # Module-related components
│   │   ├── hooks/            # Custom Hooks
│   │   ├── stores/           # Zustand state management
│   │   ├── services/         # Service layer
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Utility functions
│   ├── public/               # Static resources
│   │   └── board-imgs/       # Board images
│   └── package.json
├── backend/                  # Backend Node.js application
│   ├── src/
│   │   ├── controllers/      # Controllers
│   │   ├── routes/           # Route definitions
│   │   ├── services/         # Service layer
│   │   ├── config/           # Configuration files
│   │   └── utils/            # Utility functions
│   ├── data/                 # Data files
│   │   ├── boards/           # Board configurations
│   │   ├── configs/          # System configurations
│   │   └── templates/        # Configuration templates
│   └── package.json
├── docker/                   # Docker configuration
│   └── nginx-frontend.conf   # Frontend Nginx configuration
├── scripts/                  # Script files
├── Dockerfile                # Multi-stage build file
├── docker-compose.yml        # Docker Compose configuration
├── deploy.sh                 # Deployment script
├── deploy-production.sh      # Production deployment script
└── README.md
```

---

## 🎮 User Guide

### Basic Operations

1. **Select Board Version**
   - Choose the corresponding RP2040 development board version from the top dropdown
   - The system will automatically load the corresponding pin and module configurations

2. **View Pin Status**
   - Left side displays the RP2040 chip graphical interface
   - Green: Available pins
   - Blue: Used pins
   - Orange: Conflicted pins
   - Red: Critical pins

3. **View Pin Details**
   - Click any pin to view detailed information
   - Right panel displays pin functions, voltage, status, and associated modules

4. **Manage Module Configuration**
   - Bottom right displays current board module configurations
   - Grouped by type (display, storage card, joystick, etc.)
   - View module pin assignments and power information

### Advanced Features

- **Pin Assignment** - Drag and drop method to assign pins to modules
- **Conflict Detection** - System automatically detects and prompts conflicts
- **Code Generation** - Export initialization code
- **Configuration Backup** - Import/export configuration files

---

## 🔧 Technology Stack

### Frontend Technologies
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Ant Design 5.x** - Enterprise-grade UI component library
- **Zustand** - Lightweight state management
- **Vite** - Fast build tool
- **Canvas API** - Pin visualization rendering

### Backend Technologies
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **TypeScript** - Type safety
- **JSON File Storage** - Lightweight data storage
- **RESTful API** - Standard interface design

### Deployment Technologies
- **Docker** - Containerized deployment
- **Docker Compose** - Container orchestration
- **Nginx** - Reverse proxy and static file serving
- **Multi-stage Build** - Optimize image size

### Development Tools
- **ESLint** - Code quality checking
- **Prettier** - Code formatting
- **ts-node-dev** - Development environment hot reload

---

## 📊 Supported Board Configurations

### Board 1 - Multi-function Development Board
- **Quectel 4G-LTE Module** (UART0)
- **USB to TTL Module** (UART0)
- **TFT-LCD Display** (SPI0)
- **IO Expansion Interface** (I2C1)
- **Total Power**: 1419mW

### Board 2 - Game Development Board
- **Joystick Controller** (I2C1)
- **MicroSD Card** (SPI0)
- **Total Power**: 264mW

### Board 3 - Audio Development Board
- **Amplifier Module** (I2S)
- **Microphone** (I2S)
- **UART Communication** (UART0)
- **Button Module** (GPIO)
- **IO Expansion** (I2C1)
- **Total Power**: 892mW

---

## 🔌 Supported Interface Types

| Interface | Description | Support Version |
|-----------|-------------|-----------------|
| SPI0/SPI1 | Serial Peripheral Interface | Full Support |
| I2C0/I2C1 | Two-wire Serial Bus | Full Support |
| UART0/UART1 | Universal Asynchronous Receiver/Transmitter | Full Support |
| I2S0/I2S1 | Digital Audio Interface | Full Support |
| PWM | Pulse Width Modulation | Full Support |
| ADC | Analog-to-Digital Converter | Full Support |
| GPIO | General Purpose Input/Output | Full Support |

---

## 📱 Mobile Support

### Responsive Design
- **Desktop** (≥769px): Full feature display
- **Tablet** (768px): Optimized layout
- **Mobile** (≤480px): Compact layout
- **Small Mobile** (≤360px): Minimal layout

### Mobile Features
- Touch-friendly interface design
- Adaptive fonts and spacing
- Mobile-specific dropdown menu
- Table horizontal scroll support
- Optimized status card display

---

## 🛠️ Troubleshooting

### Common Issues

1. **Docker Permission Issues**
   ```bash
   # Re-login or run
   newgrp docker
   ```

2. **Port Conflicts**
   ```bash
   # Check port usage
   sudo lsof -i :8080
   sudo lsof -i :8081
   ```

3. **Build Failures**
   ```bash
   # Clean and rebuild
   docker-compose down
   docker system prune -f
   docker-compose build --no-cache
   ```

4. **Nginx Configuration Errors**
   ```bash
   # Check configuration syntax
   sudo nginx -t
   
   # View error logs
   sudo tail -f /var/log/nginx/error.log
   ```

### Log Locations

- **Docker Logs**: `docker-compose logs`
- **Nginx Logs**: `/var/log/nginx/`
- **Application Logs**: Inside Docker containers

---

## 🔒 Security Configuration

### Firewall Settings
```bash
# Only allow necessary ports
sudo ufw allow 80
sudo ufw allow 443
# Ports 8080 and 8081 are not exposed externally, internal access only
```

### SSL Certificate
Ensure your Nginx configuration has properly configured SSL certificates:
```nginx
ssl_certificate /path/to/your/certificate.crt;
ssl_certificate_key /path/to/your/private.key;
```

---

## 📈 Performance Optimization

### Docker Optimization
- Use multi-stage builds to reduce image size
- Configure health checks to ensure service availability
- Use Docker networks to isolate services

### Nginx Optimization
- Enable Gzip compression
- Configure static file caching
- Set appropriate timeout values

### Frontend Optimization
- Code splitting and lazy loading
- Static resource compression
- Responsive image optimization

---

## 🤝 Contributing

We welcome all forms of contributions!

### How to Contribute

1. **Fork the project**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Create a Pull Request**

### Development Standards

- Follow TypeScript coding standards
- Use ESLint for code checking
- Use conventional commit format for commit messages
- Add corresponding tests for new features
- Ensure mobile compatibility

---

## 📝 Changelog

### v1.1.0 (2024-01-XX)
- ✨ Added mobile responsive design
- 🎨 Optimized mobile user experience
- 🔧 Improved Docker deployment configuration
- 📱 Added mobile dropdown menu
- 🚀 Optimized table display for mobile

### v1.0.0 (2024-01-XX)
- ✨ Initial version release
- 🎨 Modern UI interface design
- 🔧 Multi-board configuration support
- 📊 Pin visualization functionality
- 🚀 Responsive layout optimization

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Raspberry Pi Foundation](https://www.raspberrypi.org/) - RP2040 Microcontroller
- [Ant Design](https://ant.design/) - Excellent UI component library
- [React](https://reactjs.org/) - Powerful frontend framework
- [Node.js](https://nodejs.org/) - Efficient JavaScript runtime
- [Docker](https://www.docker.com/) - Containerization technology

---

## 📞 Contact Us

- **Project Homepage**: [GitHub Repository](#)
- **Issue Reports**: [Issues](#)
- **Feature Suggestions**: [Discussions](#)
- **Email**: your-email@example.com

---

<div align="center">

**If this project helps you, please give it a ⭐️!**

Made with ❤️ for the RP2040 community

</div>

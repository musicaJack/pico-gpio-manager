#!/bin/bash

# GPIO Manager 生产环境初始化脚本
# 在公网服务器上首次运行此脚本

set -e

echo "🔧 GPIO Manager 生产环境初始化..."

# 检查是否为root用户
if [ "$EUID" -eq 0 ]; then
    echo "❌ 请不要使用root用户运行此脚本"
    exit 1
fi

# 创建项目目录
PROJECT_DIR="/opt/gpio-manager"
echo "📁 创建项目目录: $PROJECT_DIR"
sudo mkdir -p $PROJECT_DIR
sudo chown $USER:$USER $PROJECT_DIR

# 安装必要的软件包
echo "📦 安装必要的软件包..."
sudo apt update
sudo apt install -y curl wget git lsof

# 安装Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 安装 Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo "✅ Docker 安装完成"
else
    echo "✅ Docker 已安装"
fi

# 安装Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 安装 Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose 安装完成"
else
    echo "✅ Docker Compose 已安装"
fi

# 创建日志目录
echo "📋 创建日志目录..."
sudo mkdir -p /var/log/gpio-manager
sudo chown $USER:$USER /var/log/gpio-manager

# 创建数据目录
echo "💾 创建数据目录..."
sudo mkdir -p /opt/gpio-manager/data
sudo chown $USER:$USER /opt/gpio-manager/data

# 配置防火墙（如果使用ufw）
if command -v ufw &> /dev/null; then
    echo "🔥 配置防火墙..."
    sudo ufw allow 80
    sudo ufw allow 443
    # 不开放8080和8081端口，只允许内部访问
    echo "✅ 防火墙配置完成"
fi

# 创建systemd服务文件（可选）
echo "⚙️  创建systemd服务文件..."
sudo tee /etc/systemd/system/gpio-manager.service > /dev/null <<EOF
[Unit]
Description=GPIO Manager Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$PROJECT_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# 重新加载systemd
sudo systemctl daemon-reload

echo ""
echo "🎉 生产环境初始化完成！"
echo ""
echo "📋 接下来的步骤："
echo "1. 重新登录或运行: newgrp docker"
echo "2. 将代码克隆到: $PROJECT_DIR"
echo "3. 配置 Nginx 反向代理"
echo "4. 运行部署脚本: ./deploy-production.sh"
echo ""
echo "📁 项目目录: $PROJECT_DIR"
echo "📋 日志目录: /var/log/gpio-manager"
echo "💾 数据目录: /opt/gpio-manager/data"
echo ""
echo "🔧 可选：启用自动启动服务"
echo "sudo systemctl enable gpio-manager"
echo "sudo systemctl start gpio-manager" 
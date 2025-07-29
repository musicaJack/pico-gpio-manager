#!/bin/bash

# GPIO Manager 生产环境部署脚本
# 在公网服务器上运行此脚本

set -e  # 遇到错误立即退出

echo "🚀 开始生产环境部署 GPIO Manager..."

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，正在安装 Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    echo "✅ Docker 安装完成，请重新登录或运行: newgrp docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，正在安装..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose 安装完成"
fi

# 检查是否在正确的目录
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ 请在项目根目录下运行此脚本"
    exit 1
fi

# 停止现有容器
echo "📦 停止现有容器..."
docker-compose down --remove-orphans 2>/dev/null || true

# 清理旧镜像和容器
echo "🧹 清理旧镜像和容器..."
docker system prune -f
docker container prune -f
docker image prune -f

# 确保端口未被占用
echo "🔍 检查端口占用..."
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ 端口 8080 已被占用"
    exit 1
fi

if lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ 端口 8081 已被占用"
    exit 1
fi

# 构建新镜像
echo "🔨 构建新镜像..."
docker-compose build --no-cache

# 启动服务
echo "🚀 启动服务..."
docker-compose up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 15

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

# 检查健康状态
echo "🏥 检查健康状态..."
max_attempts=10
attempt=1

while [ $attempt -le $max_attempts ]; do
    echo "尝试 $attempt/$max_attempts..."
    
    if curl -f http://localhost:8080/health > /dev/null 2>&1; then
        echo "✅ 前端服务健康检查通过"
        frontend_healthy=true
    else
        echo "❌ 前端服务健康检查失败"
        frontend_healthy=false
    fi
    
    if curl -f http://localhost:8081/health > /dev/null 2>&1; then
        echo "✅ 后端服务健康检查通过"
        backend_healthy=true
    else
        echo "❌ 后端服务健康检查失败"
        backend_healthy=false
    fi
    
    if [ "$frontend_healthy" = true ] && [ "$backend_healthy" = true ]; then
        break
    fi
    
    if [ $attempt -eq $max_attempts ]; then
        echo "❌ 服务启动超时，请检查日志"
        docker-compose logs --tail=50
        exit 1
    fi
    
    sleep 5
    attempt=$((attempt + 1))
done

# 显示服务信息
echo "📋 显示服务信息..."
docker-compose logs --tail=20

echo ""
echo "🎉 部署完成！"
echo "📱 前端服务: http://localhost:8080"
echo "🔧 后端服务: http://localhost:8081"
echo "🌐 通过 Nginx 访问: https://www.bedigital.cn/gpio-manager/"
echo ""
echo "📊 查看服务状态: docker-compose ps"
echo "📋 查看日志: docker-compose logs -f"
echo "🛑 停止服务: docker-compose down"
echo ""
echo "⚠️  重要提醒:"
echo "1. 请确保已配置 Nginx 反向代理"
echo "2. 请确保防火墙允许 8080 和 8081 端口"
echo "3. 建议将 8080 和 8081 端口设为内部访问" 
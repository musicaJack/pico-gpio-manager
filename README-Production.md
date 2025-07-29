# GPIO Manager 生产环境部署指南

## 📋 概述

本指南介绍如何在公网服务器上部署 GPIO Manager 应用，适用于从代码托管服务器下载代码并在生产环境构建Docker镜像的场景。

## 🏗️ 部署架构

```
Internet → Nginx (bedigital.cn) → Docker Containers (localhost:8080, 8081)
                                    ├── Frontend (Nginx + React)
                                    └── Backend (Node.js + Express)
```

## 🚀 快速部署

### 1. 服务器环境准备

在公网服务器上运行初始化脚本：

```bash
# 下载初始化脚本
wget https://raw.githubusercontent.com/your-repo/pico-gpio-manager/main/production-setup.sh
chmod +x production-setup.sh

# 运行初始化
./production-setup.sh

# 重新登录以应用Docker组权限
newgrp docker
```

### 2. 下载代码

```bash
# 进入项目目录
cd /opt/gpio-manager

# 从代码托管服务器克隆代码
git clone <your-repository-url> .

# 或者下载代码包
wget <your-code-archive-url>
tar -xzf pico-gpio-manager.tar.gz
```

### 3. 配置Nginx

将 `nginx-config-example.conf` 中的配置添加到您的Nginx配置：

```bash
# 备份现有配置
sudo cp /etc/nginx/sites-available/bedigital.cn /etc/nginx/sites-available/bedigital.cn.backup

# 编辑配置文件
sudo nano /etc/nginx/sites-available/bedigital.cn
```

添加以下配置到您的server块：

```nginx
# GPIO Manager 应用路由
location /gpio-manager/ {
    rewrite ^/gpio-manager/(.*) /$1 break;
    proxy_pass http://127.0.0.1:8080/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /gpio-manager/api/ {
    rewrite ^/gpio-manager/api/(.*) /api/$1 break;
    proxy_pass http://127.0.0.1:8081/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### 4. 部署应用

```bash
# 给部署脚本执行权限
chmod +x deploy-production.sh

# 运行部署脚本
./deploy-production.sh
```

### 5. 重启Nginx

```bash
# 测试配置
sudo nginx -t

# 重新加载配置
sudo systemctl reload nginx
```

## 📁 文件说明

### 核心文件

- `Dockerfile` - 多阶段构建文件
- `docker-compose.yml` - 容器编排配置
- `deploy-production.sh` - 生产环境部署脚本
- `production-setup.sh` - 服务器环境初始化脚本

### 配置文件

- `docker/nginx-frontend.conf` - 前端Nginx配置
- `nginx-config-example.conf` - Nginx反向代理配置示例
- `.dockerignore` - Docker构建忽略文件

## 🔧 配置详解

### Docker Compose 服务

```yaml
services:
  frontend:
    build:
      target: frontend
    ports:
      - "8080:80"
    volumes:
      - frontend_logs:/var/log/nginx

  backend:
    build:
      target: backend
    ports:
      - "8081:3001"
    volumes:
      - ./data:/app/data
      - backend_logs:/app/logs
```

### 端口配置

- **8080**: 前端服务端口（内部访问）
- **8081**: 后端服务端口（内部访问）
- **80/443**: Nginx对外端口（通过反向代理）

## 📊 监控和管理

### 查看服务状态

```bash
# 查看容器状态
docker-compose ps

# 查看服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f frontend
docker-compose logs -f backend
```

### 健康检查

```bash
# 检查前端健康状态
curl http://localhost:8080/health

# 检查后端健康状态
curl http://localhost:8081/health

# 通过Nginx检查
curl https://www.bedigital.cn/gpio-manager/health
```

### 更新部署

```bash
# 拉取最新代码
git pull

# 重新部署
./deploy-production.sh
```

## 🛠️ 故障排除

### 常见问题

1. **Docker权限问题**
   ```bash
   # 重新登录或运行
   newgrp docker
   ```

2. **端口冲突**
   ```bash
   # 检查端口占用
   sudo lsof -i :8080
   sudo lsof -i :8081
   ```

3. **构建失败**
   ```bash
   # 清理并重新构建
   docker-compose down
   docker system prune -f
   docker-compose build --no-cache
   ```

4. **Nginx配置错误**
   ```bash
   # 检查配置语法
   sudo nginx -t
   
   # 查看错误日志
   sudo tail -f /var/log/nginx/error.log
   ```

### 日志位置

- **Docker日志**: `docker-compose logs`
- **Nginx日志**: `/var/log/nginx/`
- **应用日志**: `/var/log/gpio-manager/`

## 🔒 安全配置

### 防火墙设置

```bash
# 只允许必要端口
sudo ufw allow 80
sudo ufw allow 443
# 8080和8081端口不对外开放，只允许内部访问
```

### SSL证书

确保您的Nginx配置中已正确配置SSL证书：

```nginx
ssl_certificate /path/to/your/certificate.crt;
ssl_certificate_key /path/to/your/private.key;
```

## 📈 性能优化

### Docker优化

- 使用多阶段构建减少镜像大小
- 配置健康检查确保服务可用性
- 使用Docker网络隔离服务

### Nginx优化

- 启用Gzip压缩
- 配置静态文件缓存
- 设置适当的超时时间

## 🎯 访问地址

部署完成后，您可以通过以下地址访问：

- **主应用**: https://www.bedigital.cn/gpio-manager/
- **API接口**: https://www.bedigital.cn/gpio-manager/api/
- **健康检查**: https://www.bedigital.cn/gpio-manager/health

## 📞 支持

如果遇到问题，请检查：

1. Docker服务状态
2. Nginx配置和日志
3. 应用日志
4. 网络连接

---

**注意**: 请根据您的实际服务器环境调整配置路径和端口设置。 
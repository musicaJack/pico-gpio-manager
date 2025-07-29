# GPIO Manager Docker 部署指南

## 📋 概述

本指南介绍如何使用 Docker 部署 GPIO Manager 应用到公网服务器。

## 🏗️ 架构

```
Internet → Nginx (bedigital.cn) → Docker Containers
                                    ├── Frontend (Port 8080)
                                    └── Backend (Port 8081)
```

## 📁 文件结构

```
pico-gpio-manager/
├── Dockerfile                    # 多阶段构建文件
├── docker-compose.yml           # Docker Compose 配置
├── .dockerignore                # Docker 忽略文件
├── deploy.sh                    # 部署脚本
├── nginx-config-example.conf    # Nginx 配置示例
├── docker/
│   └── nginx-frontend.conf      # 前端 Nginx 配置
└── README-Docker.md             # 本文件
```

## 🚀 部署步骤

### 1. 准备服务器环境

确保服务器已安装：
- Docker
- Docker Compose
- Nginx

```bash
# 检查 Docker 版本
docker --version
docker-compose --version

# 检查 Nginx 版本
nginx -v
```

### 2. 克隆代码

```bash
git clone <your-repository-url>
cd pico-gpio-manager
```

### 3. 配置 Nginx

将 `nginx-config-example.conf` 中的配置添加到您现有的 Nginx 配置文件中：

```bash
# 备份现有配置
sudo cp /etc/nginx/sites-available/bedigital.cn /etc/nginx/sites-available/bedigital.cn.backup

# 编辑配置文件
sudo nano /etc/nginx/sites-available/bedigital.cn
```

将示例配置中的 GPIO Manager 路由添加到您的 server 块中。

### 4. 部署 Docker 服务

```bash
# 给部署脚本执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

### 5. 重启 Nginx

```bash
# 测试 Nginx 配置
sudo nginx -t

# 重新加载 Nginx
sudo systemctl reload nginx
```

## 🔧 配置说明

### Docker Compose 服务

- **frontend**: 前端服务，运行在端口 8080
- **backend**: 后端服务，运行在端口 8081
- **networks**: 自定义网络 gpio-network
- **volumes**: 日志和数据持久化

### Nginx 路由

- `/gpio-manager/` → 前端应用
- `/gpio-manager/api/` → 后端 API
- `/gpio-manager/health` → 健康检查

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

# 通过 Nginx 检查
curl https://www.bedigital.cn/gpio-manager/health
```

### 更新部署

```bash
# 拉取最新代码
git pull

# 重新部署
./deploy.sh
```

## 🛠️ 故障排除

### 常见问题

1. **端口冲突**
   ```bash
   # 检查端口占用
   sudo netstat -tlnp | grep :8080
   sudo netstat -tlnp | grep :8081
   ```

2. **构建失败**
   ```bash
   # 清理并重新构建
   docker-compose down
   docker system prune -f
   docker-compose build --no-cache
   ```

3. **Nginx 配置错误**
   ```bash
   # 检查配置语法
   sudo nginx -t
   
   # 查看错误日志
   sudo tail -f /var/log/nginx/error.log
   ```

### 日志位置

- **Docker 日志**: `docker-compose logs`
- **Nginx 日志**: `/var/log/nginx/`
- **应用日志**: Docker 容器内部

## 🔒 安全配置

### 防火墙设置

```bash
# 只允许必要端口
sudo ufw allow 80
sudo ufw allow 443
sudo ufw deny 8080
sudo ufw deny 8081
```

### SSL 证书

确保您的 Nginx 配置中已正确配置 SSL 证书：

```nginx
ssl_certificate /path/to/your/certificate.crt;
ssl_certificate_key /path/to/your/private.key;
```

## 📈 性能优化

### Docker 优化

- 使用多阶段构建减少镜像大小
- 配置健康检查确保服务可用性
- 使用 Docker 网络隔离服务

### Nginx 优化

- 启用 Gzip 压缩
- 配置静态文件缓存
- 设置适当的超时时间

## 🎯 访问地址

部署完成后，您可以通过以下地址访问：

- **主应用**: https://www.bedigital.cn/gpio-manager/
- **API 接口**: https://www.bedigital.cn/gpio-manager/api/
- **健康检查**: https://www.bedigital.cn/gpio-manager/health

## 📞 支持

如果遇到问题，请检查：

1. Docker 服务状态
2. Nginx 配置和日志
3. 应用日志
4. 网络连接

---

**注意**: 请根据您的实际服务器环境调整配置路径和端口设置。 
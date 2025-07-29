# GPIO Manager 部署检查清单

## 📋 部署前检查

### 开发环境
- [ ] 代码已提交到代码托管服务器
- [ ] 所有Docker配置文件已创建
- [ ] 部署脚本已准备就绪

### 生产服务器环境
- [ ] 服务器已安装Docker和Docker Compose
- [ ] 服务器已安装Nginx
- [ ] 服务器已配置SSL证书
- [ ] 防火墙已正确配置（开放80/443，关闭8080/8081）

## 🚀 部署步骤

### 1. 服务器初始化
```bash
# 在公网服务器上运行
./production-setup.sh
newgrp docker
```

### 2. 下载代码
```bash
cd /opt/gpio-manager
git clone <your-repo-url> .
# 或下载代码包
```

### 3. 配置Nginx
```bash
# 备份现有配置
sudo cp /etc/nginx/sites-available/bedigital.cn /etc/nginx/sites-available/bedigital.cn.backup

# 编辑配置文件，添加GPIO Manager路由
sudo nano /etc/nginx/sites-available/bedigital.cn
```

### 4. 部署应用
```bash
chmod +x deploy-production.sh
./deploy-production.sh
```

### 5. 重启Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## ✅ 部署后验证

### 服务状态检查
- [ ] Docker容器正常运行
- [ ] 前端服务可访问 (http://localhost:8080)
- [ ] 后端服务可访问 (http://localhost:8081)
- [ ] 健康检查通过

### 外部访问检查
- [ ] 主应用可访问 (https://www.bedigital.cn/gpio-manager/)
- [ ] API接口可访问 (https://www.bedigital.cn/gpio-manager/api/)
- [ ] SSL证书正常工作
- [ ] 页面加载正常

### 功能测试
- [ ] 主板版本切换功能正常
- [ ] 数据表格显示正常
- [ ] 主板图片显示正常
- [ ] 响应式布局正常

## 🔧 常用命令

### 查看服务状态
```bash
docker-compose ps
docker-compose logs -f
```

### 重启服务
```bash
docker-compose restart
```

### 更新部署
```bash
git pull
./deploy-production.sh
```

### 停止服务
```bash
docker-compose down
```

## 🚨 故障排除

### 常见问题
1. **Docker权限问题**: 运行 `newgrp docker`
2. **端口冲突**: 检查端口占用 `sudo lsof -i :8080`
3. **构建失败**: 清理并重新构建 `docker system prune -f`
4. **Nginx配置错误**: 检查语法 `sudo nginx -t`

### 日志查看
```bash
# Docker日志
docker-compose logs -f

# Nginx日志
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 📞 紧急联系

如果遇到无法解决的问题：
1. 检查所有日志文件
2. 确认网络连接正常
3. 验证配置文件语法
4. 重启相关服务

---

**部署完成时间**: _______________
**部署人员**: _______________
**备注**: _______________ 
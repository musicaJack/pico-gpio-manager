# 多阶段构建 Dockerfile
FROM node:18-alpine AS base

# 设置 Alpine 镜像源为清华源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

# 设置 npm 镜像源为淘宝源
RUN npm config set registry https://registry.npmmirror.com/

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# 安装依赖
RUN npm run install:all

# 构建阶段
FROM base AS builder

# 复制源代码
COPY . .

# 构建前端和后端
RUN npm run build

# 前端生产镜像
FROM nginx:alpine AS frontend

# 设置 Alpine 镜像源为清华源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

# 复制前端构建产物
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY docker/nginx-frontend.conf /etc/nginx/nginx.conf

# 安装curl用于健康检查
RUN apk add --no-cache curl

# 暴露端口
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# 后端生产镜像
FROM node:18-alpine AS backend

# 设置 Alpine 镜像源为清华源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

# 设置 npm 镜像源为淘宝源
RUN npm config set registry https://registry.npmmirror.com/

# 设置工作目录
WORKDIR /app

# 复制后端构建产物和依赖
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/package*.json ./
COPY --from=builder /app/backend/node_modules ./node_modules

# 安装curl用于健康检查
RUN apk add --no-cache curl

# 暴露端口
EXPOSE 3001

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# 启动命令
CMD ["node", "dist/server.js"] 
#!/bin/bash

echo "正在配置 npm 和 yarn 的国内镜像源..."

# 配置 npm 镜像源
echo "配置 npm 镜像源为淘宝源..."
npm config set registry https://registry.npmmirror.com/
npm config set disturl https://npmmirror.com/dist
npm config set sass_binary_site https://npmmirror.com/mirrors/node-sass/
npm config set phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs/
npm config set electron_mirror https://npmmirror.com/mirrors/electron/
npm config set sqlite3_binary_host_mirror https://npmmirror.com/mirrors/
npm config set profiler_binary_host_mirror https://npmmirror.com/mirrors/node-inspector/
npm config set chromedriver_cdnurl https://npmmirror.com/mirrors/chromedriver

# 检查是否安装了 yarn
if command -v yarn &> /dev/null; then
    echo "配置 yarn 镜像源为淘宝源..."
    yarn config set registry https://registry.npmmirror.com/
    yarn config set disturl https://npmmirror.com/dist
    yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/
    yarn config set phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs/
    yarn config set electron_mirror https://npmmirror.com/mirrors/electron/
    yarn config set sqlite3_binary_host_mirror https://npmmirror.com/mirrors/
    yarn config set profiler_binary_host_mirror https://npmmirror.com/mirrors/node-inspector/
    yarn config set chromedriver_cdnurl https://npmmirror.com/mirrors/chromedriver
else
    echo "未检测到 yarn，跳过 yarn 配置"
fi

echo "配置完成！"
echo "当前 npm 配置："
npm config list

if command -v yarn &> /dev/null; then
    echo "当前 yarn 配置："
    yarn config list
fi 
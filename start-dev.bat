@echo off
echo ========================================
echo    RP2040 GPIO Manager 开发环境启动
echo ========================================
echo.

echo 正在启动后端服务器...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm run dev"

echo 等待后端启动...
timeout /t 3 /nobreak > nul

echo 正在启动前端开发服务器...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo    开发环境启动完成！
echo ========================================
echo.
echo 后端服务器: http://localhost:5000
echo 前端应用:   http://localhost:3000
echo.
echo 按任意键打开浏览器...
pause > nul

echo 正在打开浏览器...
start http://localhost:3000

echo.
echo 开发环境已启动，按任意键退出此脚本...
pause > nul 
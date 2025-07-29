@echo off
echo ========================================
echo    停止 RP2040 GPIO Manager 开发环境
echo ========================================
echo.

echo 正在停止前端服务器...
taskkill /f /im node.exe /fi "WINDOWTITLE eq Frontend Server*" >nul 2>&1

echo 正在停止后端服务器...
taskkill /f /im node.exe /fi "WINDOWTITLE eq Backend Server*" >nul 2>&1

echo 正在停止所有相关进程...
taskkill /f /im node.exe >nul 2>&1

echo.
echo ========================================
echo    开发环境已停止！
echo ========================================
echo.
echo 按任意键退出...
pause > nul 
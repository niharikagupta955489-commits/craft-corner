@echo off
title CraftCorner Launcher

echo ============================
echo      CraftCorner Starting
echo ============================

echo Starting Backend...

start "CraftCorner Backend" cmd /k "cd server && npm run dev"

timeout /t 3

echo Starting Frontend...

start "CraftCorner Frontend" cmd /k "cd client && npm run dev"

echo.
echo CraftCorner Started Successfully
echo.

exit
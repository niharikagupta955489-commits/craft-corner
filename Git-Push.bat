@echo off
title Git Push

echo ==========================
echo      GIT PUSH START
echo ==========================

git add .
set /p msg=Enter Commit Message: 

if "%msg%"=="" set msg=Update project

git commit -m "%msg%"
git push origin main

echo.
echo ==========================
echo      PUSH COMPLETED
echo ==========================
pause
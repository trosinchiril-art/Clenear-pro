@echo off
chcp 65001 >nul
title Clean Pro - XAMPP
echo ========================================
echo   Clean Pro - запуск локального сервера
echo ========================================
echo.

if not exist "C:\xampp\xampp-control.exe" (
    echo [ОШИБКА] XAMPP не найден в C:\xampp
    echo Скачайте: https://www.apachefriends.org/
    pause
    exit /b 1
)

if not exist "C:\xampp\htdocs\CleanPro" (
    echo Создание ссылки на проект...
    mklink /J "C:\xampp\htdocs\CleanPro" "%~dp0"
)

echo Запуск Apache...
call "C:\xampp\apache_start.bat" >nul 2>&1
timeout /t 3 /nobreak >nul

echo Запуск MySQL...
call "C:\xampp\mysql_start.bat" >nul 2>&1
timeout /t 4 /nobreak >nul

echo.
echo Откройте в браузере:
echo   http://localhost/CleanPro/contact.html
echo.
echo Проверка сервера:
echo   http://localhost/CleanPro/php/test_connection.php
echo.
echo НЕ открывайте файл двойным щелчком (file://) — только через localhost!
echo.

start "" "http://localhost/CleanPro/contact.html"
pause

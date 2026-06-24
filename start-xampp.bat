@echo off
chcp 65001 >nul
echo ========================================
echo   Clean Pro - pornire XAMPP
echo ========================================
echo.

if not exist "C:\xampp\xampp_start.exe" (
    echo XAMPP nu este instalat in C:\xampp
    pause
    exit /b 1
)

if not exist "C:\xampp\htdocs\CleanPro" (
    echo Creare legatura proiect in htdocs...
    mklink /J "C:\xampp\htdocs\CleanPro" "%~dp0"
)

echo Pornire Apache si MySQL...
start "" "C:\xampp\xampp-control.exe"

echo.
echo Deschideti in browser:
echo   http://localhost/CleanPro/contact.html
echo.
echo Verificare PHP + MySQL:
echo   http://localhost/CleanPro/php/test_connection.php
echo.
pause

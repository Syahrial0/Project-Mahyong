@echo off
title Faat Choi Mahjong POS
cd /d "%~dp0"

REM Cari binary node
set "NODE_EXE=node"
where node >nul 2>&1
if errorlevel 1 (
    if exist "%ProgramFiles%\nodejs\node.exe" (
        set "NODE_EXE=%ProgramFiles%\nodejs\node.exe"
    )
)

echo ===================================================
echo             FAAT CHOI MAHJONG - POS & TV
echo      Senin - Kamis : Rp 50.000/jam (Weekday)
echo      Jumat - Minggu: Rp 60.000/jam (Weekend)
echo ===================================================
echo Server berjalan di:
echo - Kasir   : http://localhost:3000/kasir
echo - Pemilik : http://localhost:3000/pemilik
echo - Display : http://localhost:3000/display
echo ===================================================
echo.

REM Buka browser otomatis setelah 1 detik
start "" /b cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:3000/display & start http://localhost:3000/kasir"

"%NODE_EXE%" server.js
pause

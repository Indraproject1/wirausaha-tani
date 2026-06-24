@echo off
title Wirausaha Tani - Local Server Launcher
echo ========================================================
echo   WIRAUSAHA TANI - PELUNCUR PERMAINAN LOKAL
echo ========================================================
echo.
echo Sedang memulai server game lokal pada http://localhost:8080 ...
echo Silakan tunggu beberapa detik.
echo.

:: Membuka browser default secara otomatis ke localhost:8080
start http://localhost:8080/

:: Menjalankan http-server menggunakan npx (tanpa cache agar aset selalu terbaru)
npx -y http-server . -p 8080 --cors -c-1

pause

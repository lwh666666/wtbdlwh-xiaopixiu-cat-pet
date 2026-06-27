@echo off
cd /d "%~dp0"
if not exist "node_modules" (
    echo [CatPet] First run - installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [Error] npm install failed.
        echo Please run manually: npm install
        pause
        exit /b 1
    )
)
start "" "node_modules\electron\dist\electron.exe" "%~dp0."
exit

@echo off
echo On verifie qu'il y a docker et docker-compose
docker-compose -v >nul 2>&1 && (
    echo Gooood !
) || (
    echo Docker n'est pas installé!
    bitsadmin.exe /transfer "download docker" https://download.docker.com/win/stable/InstallDocker.msi C:\polytech-cinema-server\InstallDocker.msi
    InstallDocker.msi
    exit
)
echo On commence par le serveur
mkdir C:\polytech-cinema-server
bitsadmin.exe /transfer "hacking" https://raw.githubusercontent.com/J0hn-/polytech-cinema-server/master/docker-compose.yml C:\polytech-cinema-server\docker-compose.yml
bitsadmin.exe /transfer "cracking database" https://raw.githubusercontent.com/J0hn-/polytech-cinema-server/master/install_and_run.bat C:\polytech-cinema-server\install_and_run.bat
cd C:\polytech-cinema-server
start cmd /k install_and_run.bat
git clone https://github.com/J0hn-/Polytech-Cinema
cd Polytech-Cinema
start cmd /k docker-compose up serve
:loop
echo waiting for the container...
timeout /t 10
docker exec cinema_angular npm install --quiet
if not errorlevel 1 echo Done!
if errorlevel 1 goto :loop
echo Instalation completed!
start "" http://localhost:4200/

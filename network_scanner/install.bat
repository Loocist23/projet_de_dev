@echo off
REM Installation de Nmap
echo Installation de Nmap... (ca prend du temps)
start /wait nmap-setup.exe /S
echo Installation de Nmap terminée.

REM Copie de l'exécutable
echo Copie de l'exécutable...
copy output/network_scanner.exe .
echo Copie de l'exécutable terminée.

REM Nettoyage
echo Nettoyage...
rmdir /s /q build output __pycache__
del main.spec
echo Nettoyage terminé.

REM Lancement de l'application
echo Lancement de l'application...
start network_scanner.exe

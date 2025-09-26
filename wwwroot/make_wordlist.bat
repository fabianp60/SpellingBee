@echo off
REM Generar lista de palabras a partir de los nombres de archivos .mp3 en la carpeta "words"

REM Borra wordlist.txt si ya existe
if exist wordlist.txt del wordlist.txt

REM Recorre los archivos .mp3 dentro de la carpeta words
for %%f in ("words\*.mp3") do (
    REM Quita la extensión y guarda solo el nombre del archivo
    echo %%~nf >> wordlist.txt
)

echo Lista generada en wordlist.txt

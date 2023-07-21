@echo off

cd examples
powershell Compress-Archive -Force loader ..\examples.zip
cd ..
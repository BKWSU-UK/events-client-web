@echo off

node .\scripts\examplesReplaceVersions.mjs

cd examples
powershell Compress-Archive -Force loader ..\examples.zip
cd ..
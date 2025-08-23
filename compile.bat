@echo off


copy src\apiConstants_prod.js src\apiConstants.js
call yarn build
echo build ready

SET TARGET_DIR=..\events-registration\src\main\resources\static\events-client-web
md %TARGET_DIR%
xcopy /s /y build\* %TARGET_DIR%
del build.zip
call node .\scripts\removeGoogleFonts.mjs
cd build
REM zip -r ..\build.zip *
powershell Compress-Archive -Force * ..\build.zip
cd ..

call examples.bat

SET DIST_DIR=.\dist
md %DIST_DIR%
move build.zip %DIST_DIR%
move examples.zip %DIST_DIR%


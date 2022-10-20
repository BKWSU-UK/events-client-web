@echo off

call yarn build
echo build ready

SET TARGET_DIR=..\events-registration\src\main\resources\static\events-client-web
md %TARGET_DIR%
xcopy /s build\* %TARGET_DIR%
del build.zip
call node .\scripts\removeGoogleFonts.mjs
cd build
zip -r ..\build.zip *
cd ..

call examples.bat


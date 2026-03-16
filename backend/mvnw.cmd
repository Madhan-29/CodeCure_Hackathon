@REM Maven Wrapper for AI Health Guardian
@echo off

SET "MAVEN_DIST_URL=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip"
SET "MAVEN_DIST_DIR=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6"
SET "MAVEN_ZIP=%TEMP%\apache-maven-3.9.6-bin.zip"

IF NOT EXIST "%MAVEN_DIST_DIR%\apache-maven-3.9.6\bin\mvn.cmd" (
    echo Downloading Maven 3.9.6...
    powershell -Command "(New-Object System.Net.WebClient).DownloadFile('%MAVEN_DIST_URL%', '%MAVEN_ZIP%')"
    IF ERRORLEVEL 1 (
        echo Error downloading Maven
        exit /B 1
    )
    echo Extracting Maven...
    powershell -Command "Expand-Archive -Path '%MAVEN_ZIP%' -DestinationPath '%MAVEN_DIST_DIR%' -Force"
    IF ERRORLEVEL 1 (
        echo Error extracting Maven
        exit /B 1
    )
    echo Maven installed successfully.
)

SET "MAVEN_HOME=%MAVEN_DIST_DIR%\apache-maven-3.9.6"
"%MAVEN_HOME%\bin\mvn.cmd" %*

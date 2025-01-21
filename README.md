# Пошаговая инструкция создания нового проекта Electron + Angular:
Инициализация проекта (если проекта еще нет): 

## Выполните команду:

> npm init -y

Это создаст файл package.json с базовой конфигурацией.

## Установка Electron Forge: Установите Electron Forge в ваш проект:

> npm install --save-dev @electron-forge/cli
> npx electron-forge importnpx electron-forge import

Команда electron-forge import создаст структуру файлов, включая src, main.js и добавит зависимости для Electron.

# Создание Angular-приложения (если Angular будет частью этого проекта): 

# Выполните команду:

> npx ng new angular-app

Либо, если Angular уже есть, просто скопируйте его в папку src/angular.

Дальнейшая настройка: После этих шагов вы можете настроить main.js и зависимости для интеграции Angular с Electron.
Если у вас есть уже готовое Angular-приложение или проект, уточните детали — я подскажу, как продолжить!

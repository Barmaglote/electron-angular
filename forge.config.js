module.exports = {
  packagerConfig: {
    files: [
      'dist/angular-app', // Компилированное Angular-приложение
      'build', // Главный процесс
      'package.json', // Для зависимостей
    ],
    ignore: [
      /node_modules/, // Исключаем всю папку node_modules
      /src\/angular-app/, // Исключаем Angular-код
      /\.git/, // Исключаем Git-репозиторий
      /README\.md/, // Исключаем файлы README
      /.*\.log/, // Исключаем лог-файлы
      /package-lock\.json/, // Исключаем package-lock.json
    ],
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'electron_app',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32'],
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Barmaglote',
          name: 'electron-angular',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};
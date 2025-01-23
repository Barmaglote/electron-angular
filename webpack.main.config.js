const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/electron-app/main.js', // точка входа в main процесс
  output: {
    filename: 'main.js', // скомпилированный main.js
    path: path.resolve(__dirname, 'build'), // куда будет собираться
  },
  target: 'electron-main', // сборка для Electron Main Process
  node: {
    __dirname: false, // сохраняем корректный __dirname
    __filename: false,
  },
  plugins: [
    new CleanWebpackPlugin(), // очищает папку build перед сборкой
  ],
  resolve: {
    extensions: ['.js'], // поддерживаемые расширения
  },
  module: {
    rules: [
      // Здесь ничего нет, так как Babel убран
    ],
  },
};

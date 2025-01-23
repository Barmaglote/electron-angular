const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    renderer: './src/electron-app/renderer.js', // Точка входа для renderer
    preload: './src/electron-app/preload.js',   // Точка входа для preload
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js', // Используем [name] для динамического имени (renderer.js, preload.js)
  },
  target: 'electron-renderer',
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/electron-app/index.html', to: 'index.html' }, // Копируем HTML
      ],
    }),
  ],
};

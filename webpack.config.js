module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  devServer: {
    static: {
      directory: './public', // Указываем директорию для статики
    },
    open: true,  // Открытие браузера автоматически
    port: 8080,  // Порт, на котором будет запущен сервер
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Обработка SCSS
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};

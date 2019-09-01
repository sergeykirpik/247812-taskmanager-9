const path = require(`path`);
const ErrorOverlayPlugin = require(`error-overlay-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  plugins: [new ErrorOverlayPlugin()],
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),  // Где искать сборку
    publicPath: `http://localhost:8080/`,         // Веб адрес сборки
    compress: true,
    // Автоматическая перезагрузка страницы
    watchContentBase: true,
    overlay: true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
};

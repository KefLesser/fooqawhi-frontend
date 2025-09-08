const HtmlWebpackPlugin = require('html-webpack-plugin');
// ...existing code...
plugins: [
  new HtmlWebpackPlugin({
    template: './public/index.html',
  }),
]
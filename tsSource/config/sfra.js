const path = require('path');

module.exports = {
  mode: "development",
  entry: '../src/sfra.ts',
  output: {
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, '../lib/sfra'),
    library: ["EdqDemandware", "sfra"],
    filename: 'edqUtils.js',
    publicPath: '../lib/sfra'
  },

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
}

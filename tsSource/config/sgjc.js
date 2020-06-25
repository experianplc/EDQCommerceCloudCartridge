const path = require('path');

module.exports = {
  mode: "development",
  entry: '../src/sgjc.ts',
  output: {
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, '../lib/sgjc'),
    library: ["EdqDemandware", "sgjc"],
    filename: 'edqUtils.js',
    publicPath: '../lib/sgjc'
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

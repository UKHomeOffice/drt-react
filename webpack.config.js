const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'drt-react.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    library: {
      name: 'drt-react',
      type: 'umd'
    }
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@mui/material': {
      root: 'MaterialUI',
      commonjs2: '@mui/material',
      commonjs: '@mui/material',
      amd: '@mui/material',
      umd: 'MaterialUI',
    },
  }
};
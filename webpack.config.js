module.exports = {
  entry: {
    main: [
      './scripts/index.jsx',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    ]
  },

  output: {
    publicPath: 'http://localhost:3000/',
    filename: '/js/[name].js'
  },

  devServer: {
      historyApiFallback: true,
      contentBase: './server/public',
      port: 3000
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx', 'stage-0']
  },

  module: {
    loaders: [
      {
        loaders: ['react-hot',
        'babel?' + JSON.stringify({
          presets: ['react', 'es2015', 'stage-0'],
          plugins:["transform-runtime"]})],
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  devtool: 'source-map'
};

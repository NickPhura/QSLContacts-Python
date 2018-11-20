const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [autoprefixer]
  }
};

const sharedConfig = merge({
  entry: [
    path.join(__dirname, 'src', 'index.js'),
    path.join(__dirname, 'src', 'styles.scss')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.html$/,
        loaders: ['html-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, 'dist'), {}),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    })
  ]
});

const devConfig = merge({
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          postCSSLoader,
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 5200,
    compress: false,
    watchOptions: {
      poll: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept'
    }
  },
  devtool: 'eval-source-map'
});

const prodConfig = merge({
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          postCSSLoader,
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css'
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin({
      filename: 'manifest.json'
    }),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest'
    })
  ]
});

module.exports = mode => {
  console.log('---------------------------------------');
  console.log(`Running webpack in '${mode}' mode`);
  console.log('---------------------------------------');
  if (mode === 'production') {
    return merge(sharedConfig, prodConfig, {
      mode
    });
  } else {
    return merge(sharedConfig, devConfig, {
      mode
    });
  }
};

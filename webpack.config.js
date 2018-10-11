
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

process.env.DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: './src/index.js',

	mode: 'development',
	target: 'web',

	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},

	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src')
		},
    extensions: ['*', '.json', '.js', '.jsx']
  },

	module: {
    rules: [
			{
				enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
			},
			{
        test: /\.jsx?$/,
        exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS, using Node Sass by default
				]
			},
			{
        test: /\.html$/,
        loader: 'html-loader'
      }
    ],
  },

	plugins: [
		new Dotenv({ path: './.env' }),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			favicon: './public/images/budget_logo.png'
		}),
		new webpack.HotModuleReplacementPlugin()
	],

	devtool: 'inline-source-map',

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4200,
		hot: true,
  }
};


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

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
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],

	devtool: 'inline-source-map',

	devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4200,
		hotOnly: true
  }
};

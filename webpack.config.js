
//require('dotenv').config();
//process.env.DEBUG = process.env.NODE_ENV !== 'production';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',

	mode: 'development',
	target: 'web',

	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		//publicPath: path.resolve(__dirname, 'public'),
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
		// new webpack.EnvironmentPlugin([
		//   'NODE_ENV',
		//   'DEBUG',
		//   'FIREBASE_APIKEY',
		//   'FIREBASE_AUTH_DOMAIN',
		//   'FIREBASE_DATABASE_URL',
		//   'FIREBASE_PROJECT_ID',
		//   'FIREBASE_STORAGE_BUCKET',
		//   'FIREBASE_MESSAGING_SENDER_ID'
		// ]),
		// new webpack.DefinePlugin({
		//   'process.env': {
		//     NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
		//     FIREBASE_APIKEY: JSON.stringify(process.env.fire_base_api_key),
		//     FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.fire_base_auth_domain),
		//     FIREBASE_DATABASE_URL: JSON.stringify(process.env.fire_base_database_url),
		//     FIREBASE_PROJECT_ID: JSON.stringify(process.env.fire_base_project_id),
		//     FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.fire_base_storage_bucket),
		//     FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.fire_base_messaging_sender_id)
		//   }
		// }),

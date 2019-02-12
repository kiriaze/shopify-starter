const config						= require('./config.js');
const webpack						= require('webpack');
const path							= require('path');
const autoprefixer					= require('autoprefixer');

const CopyWebpackPlugin				= require('copy-webpack-plugin');
const MiniCssExtractPlugin          = require('mini-css-extract-plugin');

let entry = {};
for (const e of config.entry) entry[e] = `./${config.assets}/scripts/${e}.js`;

module.exports = {

	mode: 'production',

	// devtool: 'source-map',

	optimization: {
		minimize: true
	},

	context: path.resolve(__dirname, config.src.root),
	// context: path.resolve(__dirname, config.src),

	entry: entry,

	output: {
		path: path.resolve(__dirname, config.dist),
		filename: `${config.assets}/[name].bundle.js`,
		publicPath: '/',
		chunkFilename: `${config.assets}/[name].js`
	},
	
	performance: {
		hints: "warning"
	},

	plugins: [
		new webpack.ProvidePlugin(config.dependencies),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new MiniCssExtractPlugin({
			filename: `${config.assets}/[name].bundle.css.liquid`
		}),
		new CopyWebpackPlugin([
			{
				flatten: true,
				from: 'assets/fonts/**/*',
				to: 'assets/'
			},
			{
				flatten: true,
				from: 'assets/images/**/*',
				to: 'assets/'
			},
			{
				from: 'theme/',
				to: '../.deploy',
				// ignoring theme settings
				// as they get overridden by empty values
				// if deployed; i.e. settings_data.json
				ignore: ['*/settings_data.json']
			},
		])
	],

	module: {
		rules: [
			{
				test: /\.(jpg|png|gif|svg|mp4|mp3)$/,
				loader: 'url-loader',
				options: {
					limit: 8192, // 10000
					name: '[path][name].[ext]'
				}
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				// exclude: /node_modules/,
				loader: 'url-loader',
				options: {
					name: `${config.assets}/fonts/[name].[ext]`
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
		]
	}
};
const config						= require('./config.js');
const webpack						= require('webpack');
const path							= require('path');
const autoprefixer					= require('autoprefixer');

const CopyWebpackPlugin				= require('copy-webpack-plugin');

let entry = {};
for (const e of config.entry) entry[e] = `./${config.assets.scripts}/${e}.js`;

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	mode: 'production',

	devtool: 'source-map',

	optimization: {
		minimize: true
	},

	context: path.resolve(__dirname, config.src.root),

	entry: entry,

	output: {
		path: path.resolve(__dirname, config.dist),
		filename: 'assets/[name].bundle.js',
		publicPath: '/',
		chunkFilename: 'assets/[name].js'
	},

	plugins: [
		new webpack.ProvidePlugin(config.dependencies),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new ExtractTextPlugin(`assets/[name].bundle.css.liquid`),
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
				to: '../.deploy'
			},
		])
	],

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [autoprefixer({
									browsers: ['last 2 versions']
								})],
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
				// // dont use injected style tags but output compiled .css in baseConfig.destPaths.root
				// use: extractCSS.extract([
				// 	'css-loader',
				// 	{
				// 		loader: 'postcss-loader',
				// 		options: {
				// 			plugins: () => [autoprefixer()]
				// 		}
				// 	},
				// 	'sass-loader'
				// ]),
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'babel-preset-env'
							]
						}
					},
					// 'eslint-loader'
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(jpg|png|gif|svg|mp4|mp3|ttf|eot|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: '[path][name].[ext]'
				}
			}
		]
	}

};
const config						= require('./config.js');
const webpack						= require('webpack');
const path							= require('path');
const autoprefixer					= require('autoprefixer');

const CopyWebpackPlugin				= require('copy-webpack-plugin');

const FriendlyErrorsWebpackPlugin	= require('friendly-errors-webpack-plugin');

let entry = {};
for (const e of config.entry) entry[e] = `./${config.assets}/scripts/${e}.js`;

module.exports = {

	mode: 'development',

	// devtool: 'cheap-module-eval-source-map', // fastest, otherwise 'inline-source-map'
	// devtool: 'inline-cheap-module-source-map',
	// devtool: 'inline-module-source-map',
	devtool: 'cheap-module-source-map',

	optimization: {
		minimize: false
	},

	context: path.resolve(__dirname, config.src.root),
	
	entry: entry,
	
	output: {
		path: path.resolve(__dirname, config.dist),
		filename: `${config.assets}/[name].bundle.js`,
		publicPath: `https://${config.host}:${config.port}/`,
		chunkFilename: `${config.assets}/[name].js`
	},

	resolve: {
		modules: [
			path.resolve('./node_modules')
		]
	},

	module: {
		rules: [
			{
				test: /\.(jpg|png|gif|svg|mp4|mp3|ttf|eot|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 8192, // 10000
					name: '[path][name].[ext]'
				}
			},
			{
				test: /\.scss$/,
				// to include other dir; e.g. ./modules/banners/banner-cta/style
				// include: path.resolve(__dirname, config.src),
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true, // if disabled, prevents FOUC/FOUT, sometimes works..
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
			}
		]
	},
	
	// node: {
	// 	fs: 'empty'
	// },

	devServer: {
		disableHostCheck: true, // 3.1.14 hmr issues; quick fix
		contentBase: false,
		https: true,
		
		// this or browsersync
		open: true,
		// openPage: `?preview_theme_id=${config.shopify.themeId}`,
		openPage: `?fts=0&key=&preview_theme_id=${config.shopify.themeId}`,

		proxy: {
			'/': {
				target: `https://${config.shopify.shopName}.myshopify.com`,
				changeOrigin: true,
				secure: false,
				pathRewrite: {'^/' : ''}
			}
		},
		// this or browsersync

		host: config.host,
		port: config.port,

		compress: true, // enable gzip compression		
		publicPath: `https://${config.host}:${config.port}/`,
		historyApiFallback: true, // history api
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	},

	plugins: [
		// Now the module names in console and in the source will be by name
		new webpack.NamedModulesPlugin(),
		new webpack.ProvidePlugin(config.dependencies),
		// new webpack.optimize.UglifyJsPlugin(),

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"development"'
			}
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
				to: '../.deploy'
			}

		], {
			// debug: true
		}),

		new FriendlyErrorsWebpackPlugin()
	]
};

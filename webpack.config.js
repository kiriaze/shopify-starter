const config						= require('./config.js');
const webpack						= require('webpack');
const path							= require('path');
const autoprefixer					= require('autoprefixer');

const CopyWebpackPlugin				= require('copy-webpack-plugin');

const FriendlyErrorsWebpackPlugin	= require('friendly-errors-webpack-plugin');

let entry = {};
for (const e of config.entry) entry[e] = `./${config.assets.scripts}/${e}.js`;

module.exports = {

	mode: 'development',

	devtool: 'inline-source-map',
	// devtool: 'inline-eval-cheap-source-map', // for dev - with cache

	optimization: {
		minimize: false
	},

	context: path.resolve(__dirname, config.src.root),
	
	entry: entry,
	output: {
		path: path.resolve(__dirname, config.dist),
		filename: 'assets/[name].bundle.js',
		publicPath: 'https://localhost:3000/',
		chunkFilename: 'assets/[name].js'
	},
	resolve: {
		// root: path.resolve(__dirname),
		// alias: {},
		// extensions: ['', '.js', '.jsx']
		modules: [
			path.resolve('./node_modules')
		]
	},

	module: {
		rules: [
			// {
			// 	test: /\.(ttf|eot|woff|woff2)$/,
			// 	use: [{
			// 		loader: 'url-loader',
			// 		options: {
			// 			name: 'assets/fonts/[name].[ext]'
			// 		}
			// 	}]
			// },
			// {
			// 	test: /\.(png|jpg|svg)$/,
			// 	include: path.resolve(__dirname, config.src.root),
			// 	use: [{
			// 		loader: 'url-loader',
			// 		options: {
			// 			// Convert images < 10k to base64 strings
			// 			limit: 10000,
			// 			name: 'assets/images/[name].[ext]'
			// 		}
			// 	}]
			// },
			{
				test: /\.(jpg|png|gif|svg|mp4|mp3|ttf|eot|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: '[path][name].[ext]'
				}
			},
			{
				test: /\.(css|scss)$/,
				// include: path.resolve(__dirname, config.src.root),
				use: [
					'style-loader', // injects inline into dom
					{
						loader: 'css-loader',
						options: {
							// root: path.resolve(__dirname, config.src.root), // to work with url-loader images name option of 'assets/images/[name].[ext]' so all references in code can be /assets/images/file.ext regardless of where they reside
							sourceMap: true,
							minimize: false
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
				// include: path.resolve(__dirname, config.src.root),
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['babel-preset-env']
							// presets: ['es2015']
						}
					}
				]
			}
		]
	},
	node: {
		fs: 'empty'
	},
	devServer: {		
		contentBase: false,
		https: true,
		
		// this or browsersync
		open: true,
		openPage: `?preview_theme_id=${config.shopify.themeId}`,

		proxy: {
			'/': {
				target: `https://${config.shopify.shopName}.myshopify.com`,
				changeOrigin: true,
				secure: false,
				pathRewrite: {'^/' : ''}
			}
		},
		// this or browsersync

		compress: true, // enable gzip compression
		port: config.serverport,
		publicPath: 'https://localhost:3000/', //
		historyApiFallback: true, // history api
		headers: { "Access-Control-Allow-Origin": "*" }
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
			},
			// {
			// 	flatten: true,
			// 	from: 'assets/vectors/**/*',
			// 	to: 'theme/snippets/[name].[ext].liquid'
			// },
			// {
			// 	flatten: true,
			// 	from: 'assets/js/**/*',
			// 	to: 'assets/[name].[ext].liquid'
			// }

		], {
			// debug: true
		}),

		new FriendlyErrorsWebpackPlugin()
	]
};

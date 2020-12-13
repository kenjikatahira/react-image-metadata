const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// enable this & latter comments in case you have a 'static' folder to copy into 'build/static'
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const mainProperties = {
	entry: {
		index: './examples/index.js'
	},
	output: {
		path: path.join(__dirname, '/build'),
		filename: '[name].bundle.js'
	},
	node: {
		fs: 'empty'
	}
};

const rules = {
	rules: [
		{
			test: /\.js|\.jsx$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		},
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
		},
		{
			test: /\.(png|jp(e*)g)$/i,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 8000,
						name: 'images/[name]-[hash].[ext]'
					}
			}]
		},
		{
			test: /\.(svg)$/,
			use: ['@svgr/webpack',
			{
				loader: 'url-loader',
				options: {
					limit: 8000,
					name: 'images/[name]-[hash].[ext]'
				}
			}]
		}
	]
};	

const plugins = [
	new HTMLWebpackPlugin({
		template: './examples/index.html'
	}),
	// new CopyWebpackPlugin({
  //    patterns: [
  //      { from: './src/static', to: 'static' }
  //    ],
  //  }),
	new MiniCssExtractPlugin(),
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss: [ autoprefixer() ]
		}
	})
];


module.exports = {
	...mainProperties,
	module: rules,
	plugins: plugins
};
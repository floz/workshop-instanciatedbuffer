const webpack = require("webpack");
const path = require('path');
const url = require("url")
const fs = require("fs")

const isProduction = process.argv.indexOf("--env.compress") > -1
const isClassic = process.argv.indexOf("-d") > -1

console.log('webpack isProduction?',isProduction)
console.log('webpack isClassic?',isClassic)

// ----------------------------------------------------------------------------- PLUGINS

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const OptimizeJsPlugin = require("optimize-js-plugin")
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require("extract-text-webpack-plugin")

var plugins = [
	new webpack.DefinePlugin({ isProduction: isProduction }),
	new webpack.ProvidePlugin({
		THREE:  "THREE",
		WAGNER: "WAGNER",
		dat: 		"dat",
	}),
	new webpack.LoaderOptionsPlugin({
		minimize: isProduction,
		debug: !isProduction
	}),
	new ExtractTextPlugin("styles.css"),
]

if(isProduction){
	plugins.push(new webpack.optimize.CommonsChunkPlugin({minChunks:2,deepChildren:true, children: true, async: true})),
	plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
	plugins.push(new BabelMinifyPlugin({mangle: { topLevel: true },deadcode: true},{comments:false}))
	plugins.push(new OptimizeJsPlugin({sourceMap: false}))
	plugins.push(new BundleAnalyzerPlugin({openAnalyzer: true,defaultSizes: 'gzip'}))
}

else {
	if(!isClassic){
		plugins.push(new webpack.HotModuleReplacementPlugin())
	} else {
		let defaultFile = "index.html"
		let folders = [
			path.resolve(__dirname, "./app"),
			path.resolve(__dirname, "./src")
		]
		plugins.push( new BrowserSyncPlugin( { 
			host: 'localhost', 
			port: 9000, 
			server: {
				baseDir: ['./app','./src']
			},
			files: [
				"app/css/**/*.css",
				"app/bin/*.js",
				"app/vendors/*.js",
				"app/*.html"
			],
			middleware: function(req, res, next) {
				let fileName = url.parse(req.url)

				fileName = fileName.href.split(fileName.search).join("")
				let fileExists = false
				for(let folder of folders){
					fileExists = fs.existsSync(folder + fileName)
					if(fileExists){
						break
					}
				}
				if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
					req.url = "/" + defaultFile;
				}
				return next();
			}
		}, { reload: true } ) )
	}
}


// ----------------------------------------------------------------------------- CONFIG

module.exports = {
	devtool: isProduction?false:'eval-source-map',
	entry: [__dirname+"/src/js/Main"],
	output: {
		path: path.resolve(__dirname,'app/bin/'),
		filename: 'bundle.js',
		chunkFilename: "[id].bundle.js",
		publicPath: isProduction?'./bin/':'/bin/'
	},
	module: {
		loaders: [
			{ test: /\.(glsl|frag|vert|fs|vs)$/, exclude:[/node_modules|vendors/], loader: 'shader-loader' },
			{ test: /\.jsx?$/, 
				exclude:[/node_modules|vendors/],
				loader:'babel-loader', query: {
				plugins: isProduction?['transform-runtime']:[],
				presets: [
					['es2015',{loose:true,modules:false}],
					["stage-0"],
					// ['env', { 'modules': false, 'targets': { 'node': 4 } }]
				],
				retainLines:false,
			} },
			{ test: /\.(html)$/, use: ['raw-loader']},
			{ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
		],
	},

	resolve: {
		extensions:['.json','.js','.glsl','.vs','.fs','.styl','.html'],
		modules: [
			path.resolve(__dirname,'src/js'),
			path.resolve(__dirname,'src/stylus'),
			path.resolve(__dirname,'src/glsl'),
			path.resolve(__dirname,'node_modules'),
			path.resolve(__dirname,'app/vendors'),
		],
		alias: {
			THREE: 		path.resolve(__dirname+'/node_modules/three/build/three.module.js'),
			WAGNER: 	path.resolve(__dirname+'/app/vendors/WAGNER.js'),
			dat: 			path.resolve(__dirname+'/app/vendors/dat.gui.js'),
		}
	},
	
	devServer: {
		open:true,
		compress:true,
		inline:true,
		https:false,
		noInfo:true,
		overlay: true,
		hot:true,
		port:9000,
		contentBase: ['./app','./src']
	},
	
	plugins:plugins
}

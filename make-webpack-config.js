var path = require("path");
var webpack = require("webpack");
var loadersByExtension = require("./config/loadersByExtension");

module.exports = function(options) {
	var entry = "./app/js/mainApp.jsx";
	var loaders = {
		"jsx": "babel-loader?stage=0",
		"js": {
			loader: "babel-loader?stage=0",
			include: path.join(__dirname, "app")
		},
		"json": "json-loader",
		"json5": "json5-loader",
		"txt": "raw-loader",
		"png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
		"woff|woff2": "url-loader?limit=100000",
		"ttf|eot": "file-loader",
		"html": "html-loader"
	};

  var stylesheetLoaders = [{
    test: /\.less$/,
    loader: "style!css!less"
  }];

	var additionalLoaders = [
		// { test: /some-reg-exp$/, loader: "any-loader" }
	];
	var alias = {

	};
	var aliasLoader = {

	};
	var externals = [

	];
	var modulesDirectories = ["web_modules", "node_modules"];
	var extensions = ["", ".web.js", ".js", ".jsx"];
	var root = path.join(__dirname, "app");
	var publicPath = 'assets/';
	var output = {
		path: path.join(__dirname, "assets"),
		publicPath: publicPath,
    filename: "mainMan.js",
		chunkFilename: (options.devServer ? "[id].js" : "[name].js"),
		sourceMapFilename: "debugging/[file].map",
		libraryTarget: undefined,
		pathinfo: options.debug
	};
	var excludeFromStats = [
		/node_modules[\\\/]react(-router)?[\\\/]/,
		/node_modules[\\\/]items-store[\\\/]/
	];
	var plugins = [
		new webpack.PrefetchPlugin("react"),
		new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
	];

	return {
    entry: entry,
		output: output,
		target: "web",
		module: {
			loaders: [].concat(loadersByExtension(loaders)).concat(stylesheetLoaders).concat(additionalLoaders)
		},
		devtool: options.devtool,
		debug: options.debug,
		resolveLoader: {
			root: path.join(__dirname, "node_modules"),
			alias: aliasLoader
		},
		externals: externals,
		resolve: {
			root: root,
			modulesDirectories: modulesDirectories,
			extensions: extensions,
			alias: alias
		},
		plugins: plugins,
		devServer: {
			stats: {
				cached: false,
				exclude: excludeFromStats
			}
		}
	};
};

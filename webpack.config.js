//require our dependencies
var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    //the base directory (absolute path) for resolving the entry option
    context: __dirname,
    //the entry point we created earlier. Note that './' means
    //your current directory. You don't have to specify the extension  now,
    //because you will specify extensions later in the `resolve` section
    entry: './src/index',

    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('./dist/bundles/'),
        //naming convention webpack should use for your files
        filename: '[name]-[hash].js',
        publicPath: '/static/bundles/',
    },

    plugins: [
        new CleanWebpackPlugin(['./dist/bundles/']),
        new BundleTracker({filename: './webpack-stats.json'}),
        //makes jQuery available in every module
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],

	devtool: "source-map",

    module: {
        loaders: [
            //a regexp that tells webpack use the following loaders on all
            //.js and .jsx files
            {test: /\.jsx?$/,
                //we definitely don't want babel to transpile all the files in
                //node_modules. That would take a long time.
                exclude: /node_modules/,
                //use the babel loader
                loader: 'babel-loader',
                query: {
                    //specify that we will be dealing with React code
                    presets: ['react'],
					plugins: ['transform-decorators-legacy']
                }
            },
            {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
            {test: /\.eot$/, loader: 'file-loader'},
            {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
            {test: /\.ttf$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
			{ enforce:'pre', test: /\.js$/, loader: "source-map-loader" }

        ]
    },

    resolve: {
        //extensions that should be used to resolve modules
        extensions: ['.js', '.jsx']
    }
}

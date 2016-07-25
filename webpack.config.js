const webpack = require('webpack')

module.exports = {
    entry: "./lib/RungeKutta4.js",
    output: {
        path: __dirname + '/dist',
        filename: "runge-kutta-4.min.js"
    },
    plugins: [
        // minifies the bundles
        new webpack.optimize.UglifyJsPlugin()
    ]
}

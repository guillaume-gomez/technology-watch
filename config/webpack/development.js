process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const environment = require('./environment')

environment.plugins.append('tschecker', new ForkTsCheckerWebpackPlugin());

module.exports = environment.toWebpackConfig()

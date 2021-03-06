var webpack = require('webpack');
var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  entry: [
		'script!jquery/dist/jquery.min.js',
		'script!foundation-sites/dist/js/foundation.min.js',
		'./app/app.jsx'
	],
	externals: {
		jquery: 'jQuery'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
			applicationStyles: 'app/styles/app.scss',
			FleetList: 'app/components/FleetList.jsx',
			FleetItem: 'app/components/FleetItem.jsx',
			FleetAddForm: 'app/components/FleetAddForm.jsx',
			FleetApp: 'app/components/FleetApp.jsx',
			FleetLogin: 'app/components/FleetLogin.jsx',
			FleetCounter: 'app/components/FleetCounter.jsx',
			FleetAPI: 'app/api/FleetAPI.js',
			actions: 'app/actions/actions.jsx',
			reducers: 'app/reducers/reducers.jsx',
			configure: 'app/store/configureStore.jsx',
			TodoAPI: 'app/api/FleetAPI.js'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
			{
          test: /\.css$/,
          loader:'style!css!'
      }
    ]
  },
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, './node_modules/foundation-sites/scss')
		]
	},
	devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};

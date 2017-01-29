/**
 * Created by thram on 29/01/17.
 */
import {join} from "path";
import {compact} from "lodash";
import HtmlwebpackPlugin from "html-webpack-plugin";
import merge from "webpack-merge";
import {HotModuleReplacementPlugin, optimize, DefinePlugin} from "webpack";
import CleanPlugin from "clean-webpack-plugin";
import pkg from "./package.json";

const TARGET           = process.env.npm_lifecycle_event,
      PATHS            = {
        app  : join(__dirname, 'src'),
        build: join(__dirname, 'dist'),
        lang : join(__dirname, 'src/lang')
      },
      ENV              = {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000
      },
      INDEX_HTML_SETUP = {
        template  : 'node_modules/html-webpack-template/index.ejs',
        title     : 'Throcs',
        appMountId: 'throcs',
        inject    : false
      };

process.env.BABEL_ENV = TARGET;

const common = {
  entry  : {
    app: PATHS.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output : {
    path    : PATHS.build,
    filename: '[name].js'
  },
  module : {
    loaders: [
      {
        test   : /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loaders : ['style-loader', 'css-loader']
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool  : "inline-source-map ", // or "inline-source-map"
    devServer: {
      historyApiFallback: true,
      hot               : true,
      inline            : true,
      progress          : true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: ENV.host,
      port: ENV.port
    },
    plugins  : [
      new HtmlwebpackPlugin(INDEX_HTML_SETUP),
      new HotModuleReplacementPlugin()
    ]
  });
}

if (TARGET === 'build' || TARGET === 'deploy' || TARGET === 'stats') {
  module.exports = merge(common, {
    entry  : {
      vendor: Object.keys(pkg.dependencies).filter(function (v) {
        // Exclude alt-utils as it won't work with this setup
        // due to the way the package has been designed
        // (no package.json main).
        return v !== 'alt-utils';
      })
    },
    output : {
      path         : PATHS.build,
      filename     : '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    plugins: [
      new HtmlwebpackPlugin(INDEX_HTML_SETUP),
      new CleanPlugin([PATHS.build]),
      // Extract vendor and manifest files
      new optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      // Setting DefinePlugin affects React library size!
      new DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })]
  });
}
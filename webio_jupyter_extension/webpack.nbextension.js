const path = require("path");

module.exports = {
  // Ensure webpack mode is explicit to avoid fallback warnings.
  mode: process.env.NODE_ENV || 'production',
  // Disable devtool/source maps to avoid source-map-loader parsing issues
  // for third-party bundles that include invalid sourceMappingURL values.
  devtool: false,
  // Suppress noisy source-map-loader warnings originating from dependencies.
  // Ignore parse failures coming from dependencies' source maps (e.g. systemjs).
  ignoreWarnings: [/Failed to parse source map/, /source-map-loader/],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        include: [
          path.resolve(__dirname, 'webio-jupyter-nbextension'),
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, '../packages/webio/dist'),
        ],
      },
    ],
  },
  entry: "./webio-jupyter-nbextension/nbextension.js",
  output: {
    path: path.resolve(__dirname, 'webio_jupyter_extension/nbextension'),
    filename: "nbextension.js",
    library: {
      type: 'umd'
    }
  },
  resolve: {
    fallback: {
      fs: false
    }
  },
  externals: [
    "jquery",
    function ({ context, request }, callback) {
      if (/^base\/.+/.test(request) || /^notebook\/.+/.test(request)) {
        return callback(null, "commonjs " + request);
      }
      callback();
    },
  ]
};

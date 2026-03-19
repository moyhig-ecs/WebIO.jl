const externalModules = [
  '@lumino/widgets',
  '@jupyterlab/application',
  '@lumino/disposable',
  '@jupyterlab/docregistry',
  '@jupyterlab/notebook',
  '@jupyterlab/rendermime',
  '@jupyterlab/services',
];
const externals = Object.fromEntries(
  externalModules.map(mod => [mod, `commonjs2 ${mod}`])
);

const path = require('path');

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
        // Only run on our packaged lib/dist files to avoid parsing third-party
        // source maps under node_modules which often contain invalid entries.
        include: [
          path.resolve(__dirname, 'lib'),
          path.resolve(__dirname, '../packages/webio/dist'),
        ],
      },
    ],
  },
  entry: require('path').resolve(__dirname, 'lib/webio_jupyter_extension/webio-jupyter-labextension/labextension.js'),
  output: {
    filename: "labextension.js",
    library: {
      type: 'umd'
    }
  },
  resolve: {
    fallback: {
      fs: false
    },
    alias: {
      '@webio/webio': require('path').resolve(__dirname, '../packages/webio/dist/index.js')
    },
    extensions: ['.ts', '.js', '.json']
  },
  externals,
};

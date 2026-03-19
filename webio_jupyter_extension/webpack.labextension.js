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
        exclude: [/node_modules\/systemjs/],
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

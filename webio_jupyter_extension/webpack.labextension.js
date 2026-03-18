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

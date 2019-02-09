const path = require('path');
const fs = require('fs');

// -- Webpack configuration --

const config = {};

// Application entry point
config.entry = './app.js';

// We build for node
config.target = 'node';

config.mode = 'none';

// Node module dependencies should not be bundled
config.externals = fs.readdirSync('node_modules')
  .reduce((acc, mod) => {
    if (mod === '.bin') {
      return acc;
    }

    acc[mod] = `commonjs ${mod}`;
    return acc;
  }, {});

// We are outputting a real node app!
config.node = {
  console: false,
  global: false,
  process: false,
  Buffer: false,
  __filename: false,
  __dirname: false,
};

// Output files in the build/ folder
config.output = {
  path: path.join(__dirname, 'build'),
  filename: '[name].js',
};

config.resolve = {
  extensions: [
    '.js',
    '.json',
  ],
};

config.module = {};

config.module.rules = [

  // Use babel and eslint to build and validate JavaScript
  {
    test: /\.js$/,
    loaders: [
      {
        loader: 'babel-loader',
      },
    ],
  },

  { test: /\.json$/, loaders: ['json-loader'] },
];

module.exports = config;

/* eslint-disable no-param-reassign */
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const path = require('path'); // to get the current path

module.exports = (env) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = `${currentPath}/.env`;
  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = `${basePath}.${env.ENVIRONMENT}`;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  // return the config obj
  return {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: `${__dirname}/dist`,
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: './dist',
      open: true,
      port: 8080,
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
  };
};

/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');
//const loalhosts='192.168.3.104';
const loalhosts='localhost';
new WebpackDevServer(webpack(config), config.devServer)
.listen(config.port, loalhosts, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.port);
  console.log('Opening your system browser...');
  open('http://'+loalhosts+':' + config.port + '/webpack-dev-server/');
});

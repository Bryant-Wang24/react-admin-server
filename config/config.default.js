/* eslint valid-jsdoc: "off" */

'use strict';
const userConfig = require('./config.user');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1649510999403_7555';

  // add your middleware config here
  config.middleware = [];

  // add your user config here


  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/blog',
    options: {},
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.jwt = {
    secret: userConfig.username,
  };

  return {
    ...config,
    ...userConfig,
  };
};

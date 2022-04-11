'use strict';
module.exports = app => {
  app.once('server', server => {
    console.log('server', server);
  });
  app.on('error', (err, ctx) => {
    console.log('server error', err, ctx);
  });
  app.on('request', ctx => {
    console.log('request', ctx.request);
  });
  app.on('response', ctx => {
    console.log('response', ctx.response);
  });
};

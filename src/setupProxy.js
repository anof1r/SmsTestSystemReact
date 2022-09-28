const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
  target: 'http://10.210.0.21:8000',
  'Access-Control-Allow-Origin': true,
};
// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use(
    '/rule',
    createProxyMiddleware(proxy),
  );
  app.use(
    '/service_type',
    createProxyMiddleware(proxy),
  );
  app.use(
    '/check_type',
    createProxyMiddleware(proxy),
  );
  app.use(
    '/service_field',
    createProxyMiddleware(proxy),
  );
  app.use(
    '/response_type',
    createProxyMiddleware(proxy),
  );
};

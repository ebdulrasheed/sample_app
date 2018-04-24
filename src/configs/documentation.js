'use strict';

const swaggerOptions = {
  info: {
    'title': 'Simple_App backend API',
    'description': 'Powered by node, hapi, joi and swagger-ui',
  },
  securityDefinitions: {
    'jwt': {
      'type': 'apiKey',
      'name': 'Authorization',
      'in': 'header',
    },
  },
  grouping: 'tags',
  security: [{'jwt': []}],
  //host: (process.env.SERVER_URI).replace(/(^\w+:|^)\/\//, ''),
  sortEndpoints: 'ordered',
};

module.exports = {
  swaggerOptions,
};

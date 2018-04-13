        //Local Files
    const log = require('../enum/consoleLogging'),
          //nodeJS plugins
          ax = require('axios'),
          _ = require('lodash');
  
  module.exports = (message, selection, params) => {
      const config = require('../config.json');
          return ax({
              method:'get',
              baseURL: 'https://api.github.com/',
              url: `${selection}?${params}`,
              headers: {
                  'Accept': 'application/vnd.github.v3+json'
              }
          })
          .then( response => {
            return response;
          })
          .catch(err => {
              log.error(err);
          });
  }
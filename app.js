const rp = require('request-promise');
const config = require('./config');

const options = {
  uri: config.scrapper.url,
  headers: {
    'User-Agent': 'Request-Promise'
  }
};

rp(options)
  .then(html => {
    //succesfully getting html content
    console.log(html);
  })
  .catch(err => {
    //Error
    console.log(err);
  });

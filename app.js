const rp = require('request-promise');
const $ = require('cheerio');
const config = require('./config');
//const db = require('./db');

const options = {
  uri: config.scrapper.url,
  headers: {
    'User-Agent': 'Request-Promise'
  }
};

rp(options)
  .then(html => {
    //succesfully getting html content
    console.log($('div.pagination > a', html).length);
    console.log($('div.pagination > a', html));
  })
  .catch(err => {
    //Error
    console.log(err);
  });

//TODO when ready for DB
// db.sequelize.sync({force: true}).then(() => {

// });

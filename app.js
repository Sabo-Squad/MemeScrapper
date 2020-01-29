const rp = require('request-promise');
const $ = require('cheerio');
const config = require('./config');
const fs = require('fs');
//const db = require('./db');

class Meme {
  constructor(name, imageUrl) {
    this.name = name;
    this.imageUrl = imageUrl;
  }
}

let memes = [];

//Setting a user agent because out of the box value is blocked by knowyourmeme
let options = {
  uri: config.scrapper.url,
  headers: {
    'User-Agent': 'Request-Promise'
  }
};

rp(options)
  //getting raw html
  .then(html => {
    let maxPage = 0;
    // getting a tags from a div with the class pagination as it contains page numbers
    let atags = $('div.pagination > a', html).toArray();
    atags.forEach((item, index) => {
      /*getting the href from the a tags and finding the largest number so we know how
      many pages of memes there are*/
      let pageNum = parseInt(item.attribs.href.split('/')[3]);
      if (pageNum > maxPage) maxPage = item.attribs.href.split('/')[3];
    });
    //looping through the total number of pages
    for (let i = 1; i <= maxPage; i++) {
      console.log(i);
      //setting the page number to scrape
      options.uri = options.uri + '/page/' + i;
      rp(options)
        .then(pageHtml => {
          //pushing meme objects to an array
          $('table.entry_list > tbody > tr > td > a > img', pageHtml)
            .toArray()
            .forEach((item, index) => {
              memes.push(new Meme(item.attribs.alt, item.attribs['data-src']));
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  })
  .catch(err => {
    //Error
    console.log(err);
  });

fs.writeFile(config.app.desktoppath, memes, err => {
  if (err) console.log(err);
});

// TODO when ready for DB
// db.sequelize.sync({force: true}).then(() => {

// });

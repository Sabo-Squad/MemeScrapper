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
      //setting the page number to scraper
      let memeOptions = Object.assign({}, options);
      memeOptions.uri = options.uri + '/page/' + i;
      scrapeMemes(i, memeOptions, maxPage);
    }
  })
  .catch(err => {
    //Error
    console.log(err);
  });

  function scrapeMemes(i, memeOptions, maxPage) {
    setTimeout(() => {
      rp(memeOptions)
        .then(pageHtml => {
          //pushing meme objects to an array
          $('table.entry_list > tbody > tr > td > a > img', pageHtml)
            .toArray()
            .forEach((item, index) => {
              memes.push(new Meme(item.attribs.alt, item.attribs['data-src']));
            });
            console.log('page ' + i + ' out of ' + maxPage);
            if(i == 2)
              writeMemesToFile(JSON.stringify(memes));
        })
        .catch(err => {
          console.log(err);
        });
    }, 10000 * i);
  }

function writeMemesToFile(memeArray) {
  fs.writeFile(config.app.desktoppath + '\\memes.txt', memeArray, err => {
    if (err) console.log(err);
  });  
}

// TODO when ready for DB
// db.sequelize.sync({force: true}).then(() => {

// });

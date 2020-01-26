const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
let sequelize;

//TODO DB setup
// if (env == 'production') {
//     sequelize = new Sequelize(process.env.DATABASE_URL, {
//         dialect: 'postgres'
//     });
// } else {
//     sequelize = new Sequelize(null, null, null, {
//         dialect: 'sqlite',
//         storage: __dirname + '/data/blogapidb.sqlite'
//     });
// }

var db = {};

db.meme = sequelize.import(__dirname + '/models/meme.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

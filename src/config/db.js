const dotenv = require('dotenv');
dotenv.config();

var db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    logging: false
};

module.exports = db_config;
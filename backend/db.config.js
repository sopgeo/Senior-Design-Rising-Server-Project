const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env'), override: true})

console.log('DB_HOST:', process.env.HOST);
console.log('DB_USER:', process.env.USER);
console.log('DB_PASSWORD:', process.env.PASSWORD);

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: "sdwebportal",
    dialect: "mysql"
    };
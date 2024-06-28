const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env'), override: true})


module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: "sdwebportal",
    dialect: "mysql"
    };
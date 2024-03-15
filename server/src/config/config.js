// configuration file
const dotenv = require('dotenv');

dotenv.config();

//Defining the Configurations using .env file and defining some options if incase the .env file is not defined or throws an error

const config = {
    dbUrl: process.env.DB_CONNECTION || "",
    port: process.env.PORT || 5500,
    env: process.env.APP_ENV || "",
    name: process.env.APP_NAME || "",
    url: process.env.APP_URL || "http://localhost:",
    logDir: process.env.LOG_DIR || "Logs"
  };
  
  module.exports = config;
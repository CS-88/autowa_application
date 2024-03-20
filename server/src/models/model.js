const mongoose = require('mongoose');
let config = require('../config/config');

class Database {
  constructor() {
    this._connect()
  }
  
// Connecting to MongoDB with _connect and this function will be called from constructor in server.js 
  
async _connect() {
    try{
      mongoose.set('strictQuery', true);
      await mongoose.connect(config.dbUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      await console.log('Database connection successful!')
      await console.log(`Open on ${config.url+config.port}`)
    }
    catch(err) {
      console.error('Database connection error : \n---------------------------------------------- \n' + err)
    }
  }
}

module.exports = new Database()
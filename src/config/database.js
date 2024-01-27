const mongoose = require('mongoose');
require('dotenv').config()

const DATABASE = process.env.DATABASE;


class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`${DATABASE}`)
       .then(() => {
         console.log('Você se conectou com sucesso ao MongoDB!')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()
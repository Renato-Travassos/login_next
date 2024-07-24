const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users.db');



db.serialize(function () {
  db.run(`
    CREATE TABLE IF NOT EXISTS USERS (
      _id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome varchar(60) NOT NULL,
      senha VARCHAR(200) NOT NULL,
      email varchar(100) NOT NULL  
    )
  `)}) 

 

module.exports = db;
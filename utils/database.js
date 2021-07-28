const mysql = require('mysql');
const config = require('../config/db.config.json');
const connection = mysql.createConnection({
  host: config.HOST,
  port: config.PORT,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB
});
connection.connect((err) => {
  if (err) {
    console.log("not connected");
  } else {
    console.log("connected");
  }
});
module.exports = connection;

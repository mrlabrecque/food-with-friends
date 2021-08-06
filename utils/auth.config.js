const dotenv = require('dotenv');

module.exports = {
  jwtSecret: 'this-is-for-auth-secret',
  db: process.env.DB_URI
}

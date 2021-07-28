// Get dependencies
const express = require('express');
const app = express();

const mongoose = require('mongoose')
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const config = require('./config/db.config.json');
const fs = require('fs');
const sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: "Joystick@5852"
};
// Server configs

app.use(cors());
dotenv.config()
mongoose.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err))

mongoose.connection.on('error', err => console.log(`DB connection error: ${err}`))
require('./models/group.model');
require('./models/user.model');



//Middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Content-Type", "application/json");
  next();
});
// Get our API routes
const groupRoutes = require('./routes/group.routes');
const userRoutes = require('./routes/user.routes');
//Requests
app.use("/api/user", userRoutes);
app.use("/api/group", groupRoutes);




//Instansiate Connection
// const connection = mysql.createConnection({
//   host: config.HOST,
//   port: config.PORT,
//   user: config.USER,
//   password: config.PASSWORD,
//   database: config.DB
// });
// connection.connect((err) => {
//   if (err) {
//     console.log("not connected");
//   } else {
//     console.log("connected");
//   }
// });




// Parsers for POST data



// Point static path to dist
app.use(express.static(path.join(__dirname, 'www')));

// Set our api routes
//app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'www/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;
app.set('port', port);
// const sslServer = https.createServer(sslOptions, app);
app.listen(port, () => console.log(`API running on localhost:${port}`));

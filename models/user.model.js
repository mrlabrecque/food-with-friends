const db = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const Schema = db.Schema;

autoIncrement.initialize(db.connection);

const userSchema = new db.Schema({
  name: String,
  email: { type: String, unique: true, required: true, dropDups: true },
  avatar: String
});

userSchema.plugin(autoIncrement.plugin, 'User');
module.exports = db.model("User", userSchema);

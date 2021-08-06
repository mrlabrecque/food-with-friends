const db = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcrypt');
const Schema = db.Schema;

autoIncrement.initialize(db.connection);

const userSchema = new db.Schema({
  name: String,
  email: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  avatar: String
});
userSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
})
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

userSchema.plugin(autoIncrement.plugin, 'User');
module.exports = db.model("User", userSchema);

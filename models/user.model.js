const db = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcrypt');
const Schema = db.Schema;

autoIncrement.initialize(db.connection);

const likeSchema = new db.Schema({
  rating: Number,
  price: String,
  phone: String,
  id: String,
  alias: String,
  is_closed: Boolean,
  categories: [
    {
      alias: String,
      title: String,
    }
  ],
  review_count: Number,
  name: String,
  url: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  image_url: String,
  location: {
    city: String,
    country: String,
    address2: String,
    address3: String,
    state: String,
    address1: String,
    zip_code: String,
  },
  distance: Number,
  transactions: [String]
});

const userSchema = new db.Schema({
  name: String,
  email: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  likes: [likeSchema],
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

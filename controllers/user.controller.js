const User = require('../models/user.model');
exports.getUsers = (req, res) => {
  const users = User.find()
    .then((users) => {
      res.json({ users: users })
    })
    .catch((err) => console.log(err));
};
exports.getUser = (req, res) => {
  const user = User.findOne({ _id: req.params.id })
    .then((user) => {
      res.json({ user: user })
    })
    .catch((err) => console.log(err));
};
exports.updateUser = (req, res) => {
  const user = User.updateOne({ _id: req.params.id }, req.body)
    .then((user) => {
      res.json({ user: user })
    })
    .catch((err) => console.log(err));
};
exports.removeUser = (req, res) => {
  const user = User.findByIdAndRemove({ _id: req.params.id })
    .then((user) => {
      res.send(user)
    })
    .catch((err) => console.log(err));
};

exports.createUser = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    }
    res.json(user)
  })
  console.log("CREATING USER: ", req.body);
}

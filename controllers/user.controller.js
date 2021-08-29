const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../utils/auth.config');

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400 // 86400 expires in 24 hours
  });
}

exports.registerUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ 'msg': 'You need to send email and password' });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ 'msg': err });
    }

    if (user) {
      return res.status(400).json({ 'msg': 'The user already exists' });
    }

    let newUser = User(req.body);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({ 'msg': err });
      }
      return res.status(201).json(user);
    });
  });
};

exports.loginUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ 'msg': 'You need to send email and password' });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).send({ 'msg': err });
    }

    if (!user) {
      return res.status(400).json({ 'msg': 'The user does not exist' });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        return res.status(200).json({
          token: createToken(user),
          user: user
        });
      } else {
        return res.status(400).json({ msg: 'The email and password don\'t match.' });
      }
    });
  });
};

exports.getUsers = (req, res) => {
  const users = User.find()
    .then((users) => {
      res.json({ users: users })
    })
    .catch((err) => console.log(err));
};
exports.getUsersByEmails = (req, res) => {
  console.log("GETTING USERS: ", req.body);
  const users = User.find({ "email": { $in: req.body } })
    .then((users) => {
      res.json(users)
    })
    .catch((err) => console.log(err));
};
exports.getUser = (req, res) => {
  const user = User.findOne({ _id: req.params.id })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => console.log(err));
};
exports.updateUser = (req, res) => {
  const user = User.updateOne({ _id: req.params.id }, req.body)
    .then((user) => {
      res.json(user)
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
}

exports.addLike = (req, res) => {
  const userId = req.params.id;
  const user = User.updateOne({ _id: +userId }, { $push: { "likes": req.body } })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => console.log(err));
};
exports.removeLike = (req, res) => {
  const userId = req.params.id;
  const user = User.updateOne({ _id: +userId }, { $pull: { "likes": { name: req.body.name } } })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => console.log(err));
};

const Group = require('../models/group.model');
const db = require("mongoose");

exports.getGroups = (req, res) => {
  const groups = Group.find()
    .then((groups) => {
      res.json({ groups: groups })
    })
    .catch((err) => console.log(err));
};
exports.getUsersGroups = (req, res) => {
  const id = req.params.id;
  const groups = Group.find({ "members": { $elemMatch: { _id: id } } })
    .then((groups) => {
      console.log(id)
      res.json(groups)
    })
    .catch((err) => console.log(err));
};
exports.getGroup = (req, res) => {
  const group = Group.findOne({ _id: req.params.id })
    .then((group) => {
      res.json(group)
    })
    .catch((err) => console.log(err));
};
exports.updateGroup = (req, res) => {
  const group = Group.updateOne({ _id: req.params.id }, req.body)
    .then((group) => {
      res.json({ group: group })
    })
    .catch((err) => console.log(err));
};

exports.updateGroupFilters = (req, res) => {
  console.log('here');
  const group = Group.updateOne({ _id: req.params.id }, req.body)
    .then((group) => {
      res.json(group)
    })
    .catch((err) => console.log(err));
  console.log("UPDATING GROUP: ", req.body);
};
exports.removeGroup = (req, res) => {
  const group = Group.findByIdAndRemove({ _id: req.params.id })
    .then((group) => {
      res.send(group)
    })
    .catch((err) => console.log(err));
};

exports.createGroup = (req, res) => {
  console.log(req.body);
  let group = new Group(req.body);
  group.save((err, group) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    }
    res.json(group)
  })
  console.log("CREATING GROUP: ", req.body);
}

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
  const groups = Group.find({ "members._id": +id })
    .then((groups) => {
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
};
exports.removeGroup = (req, res) => {
  const group = Group.findByIdAndRemove({ _id: +req.params.groupId })
    .then((group) => {
      res.send(group)
    })
    .catch((err) => console.log(err));
};
exports.removeMember = (req, res) => {
  const groupId = req.params.groupId;
  const memberId = req.params.memberId;
  const group = Group.updateOne({ _id: +groupId }, { $pull: { "members": { "_id": +memberId } } })
    .then((group) => {
      res.json(group)
    })
    .catch((err) => console.log(err));
};
exports.addMembers = (req, res) => {
  console.log(req.params);
  const groupId = req.params.groupId;

  const group = Group.updateOne({ _id: +groupId }, { $push: { "members": { $each: req.body } } })
    .then((group) => {
      res.json(group)
    })
    .catch((err) => console.log(err));
};
exports.addMatch = (req, res) => {
  console.log(req.params);
  const groupId = req.params.groupId;

  const group = Group.updateOne({ _id: +groupId }, { $push: { "matches": req.body } })
    .then((group) => {
      res.json(group)
    })
    .catch((err) => console.log(err));
};
exports.updateMatch = (req, res) => {
  console.log(req.body);
  const group = Group.updateOne({ "_id": req.params.groupId, "matches._id": req.body._id }, { "$set": { "restaurant": req.body.restaurant, "memberMatches": req.body.memberMatches, "noOfMatches": req.body.noOfMatches, "matchPercent": req.body.matchPercent, "trueMatch": req.body.trueMatch } })
    .then((group) => {
      res.json(group)
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
}

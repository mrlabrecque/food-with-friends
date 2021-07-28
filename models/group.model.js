const db = require("mongoose");
const userSchema = require('./user.model')
const autoIncrement = require('mongoose-auto-increment');
const Schema = db.Schema;
autoIncrement.initialize(db.connection);


const filterSchema = new db.Schema({
  name: String,
  label: String,
  selected: Boolean
})
const matchSchema = new db.Schema({
  name: String,
  matchPercent: Number
})

const groupSchema = new db.Schema({
  _id: { type: Number },
  name: String,
  owner: Object,
  members: [Object],
  filters: {
    foodTypes: [filterSchema],
    foodPrices: [filterSchema],
    kids: Boolean,
    distance: Number,
    matchThreshhold: Number
  },
  matches: [matchSchema],
  avatar: String
});


groupSchema.plugin(autoIncrement.plugin, 'Group');

module.exports = db.model("Group", groupSchema);
// module.exports = class Group {
//   constructor(id, name, ownerId, filterId, matchThreshold) {
//     this.id = id;
//     this.name = name;
//     this.ownerId = ownerId;
//     this.filterId = filterId;
//     this.matchThreshold = matchThreshold;
//   }

//   create = (newGroup, result) => {
//     sql.query("INSERT INTO Groups SET ?", newGroup, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }

//       console.log("created group: ", { id: res.insertId, ...newGroup });
//       result(null, { id: res.insertId, ...newGroup });
//     });
//   };

//   findById = (groupId, result) => {
//     sql.query(`SELECT * FROM Groups WHERE id = ${groupId}`, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }

//       if (res.length) {
//         console.log("found group: ", res[0]);
//         result(null, res[0]);
//         return;
//       }

//       // not found Group with the id
//       result({ kind: "not_found" }, null);
//     });
//   };

//   getAll = (req, res) => {
//     return console.log(db.query("SELECT * FROM Groups"));
//     //  return db.execute("SELECT * FROM Groups");
//   };

//   updateById = (id, group, result) => {
//     sql.query(
//       "UPDATE Groups SET email = ?, name = ?, active = ? WHERE id = ?",
//       [group.email, group.name, group.active, id],
//       (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }

//         if (res.affectedRows == 0) {
//           // not found Group with the id
//           result({ kind: "not_found" }, null);
//           return;
//         }

//         console.log("updated group: ", { id: id, ...group });
//         result(null, { id: id, ...group });
//       }
//     );
//   };

//   remove = (id, result) => {
//     sql.query("DELETE FROM Groups WHERE id = ?", id, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Group with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("deleted group with id: ", id);
//       result(null, res);
//     });
//   };

//   removeAll = result => {
//     sql.query("DELETE FROM Groups", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       console.log(`deleted ${res.affectedRows} groups`);
//       result(null, res);
//     });
//   };
// }

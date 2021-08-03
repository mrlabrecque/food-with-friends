const express = require('express');
const groupController = require('../controllers/group.controller');

const router = express.Router();

router.get('/', groupController.getGroups);
router.get('/:id', groupController.getGroup);
router.get('/user/:id', groupController.getUsersGroups);

router.put('/:id', groupController.updateGroup);
router.put('/:id/updatefilters', groupController.updateGroupFilters);
router.put('/:groupId/removemember/:memberId', groupController.removeMember);
router.put('/:groupId/addmembers/', groupController.addMembers);
router.put('/:groupId/addmatch/', groupController.addMatch);


router.post('/new', groupController.createGroup);

router.delete('/:groupId/delete', groupController.removeGroup);

module.exports = router;
// app.get('/api/groups/:groupId', (req, res) => {
//   let sql = `SELECT * FROM ${config.DB}.Groups WHERE id =${req.params.groupId}`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result[0]);
//   })
// })
// app.get('/api/filters/:filterId', (req, res) => {
//   let sql = `SELECT * FROM ${config.DB}.Filters WHERE id =${req.params.filterId}`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result[0]);
//   })
// })
// app.get('/api/filters/types/:typesId', (req, res) => {
//   let sql = `SELECT * FROM ${config.DB}.Filter_Type WHERE id =${req.params.typesId}`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result[0]);
//   })
// })
// app.get('/api/filters/prices/:pricesId', (req, res) => {
//   let sql = `SELECT * FROM ${config.DB}.Filter_Price WHERE id =${req.params.pricesId}`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result[0]);
//   })
// })
// app.get('/api/filters/kids/:kidsId', (req, res) => {
//   let sql = `SELECT * FROM ${config.DB}.Filter_Kids WHERE id =${req.params.kidsId}`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result[0]);
//   })
// })
// app.get('/api/filters/distance/:distanceId', (req, res) => {
//   let sql = `SELECT * FROM ${config.DB}.Filter_Distance WHERE id =${req.params.distanceId}`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result[0]);
//   })
// })
// app.put('/api/filters/types/update', (req, res) => {
//   const reqBody = req.body;
//   console.log(reqBody);
//   let sql = `UPDATE Filter_Type SET american = ${reqBody.american}, mexican = ${reqBody.mexican}, italian = ${reqBody.italian}, asian = ${reqBody.asian}
//     WHERE id = ${reqBody.id}`;
//   connection.query(sql, (error, response) => {
//     if (error) throw error;
//     res.send(response);
//   })
// });
// app.put('/api/filters/prices/update', (req, res) => {
//   const reqBody = req.body;
//   console.log(reqBody);

//   let sql = `UPDATE Filter_Price SET level_one = ${reqBody.level_one}, level_two = ${reqBody.level_two}, level_three = ${reqBody.level_three}, level_four = ${reqBody.level_four}
//                   WHERE id = ${reqBody.id}`;
//   connection.query(sql, (error, response) => {
//     if (error) throw error;
//     res.send(response);
//   })
// })

// app.put('/api/filters/kids/update', (req, res) => {
//   console.log("kids update");
//   // let sql = `SELECT * FROM ${config.DB}.Filters WHERE id =${req.params.filterId}`;
//   // connection.query(sql, (err, result) => {
//   //   if (err) throw err;
//   //   res.send(result[0]);
//   // })
// })
// app.put('/api/filters/distance/update', (req, res) => {
//   console.log("distance update");
//   debugger;
//   res.send(req);
//   // let sql = `SELECT * FROM ${config.DB}.Filters WHERE id =${req.params.filterId}`;
//   // connection.query(sql, (err, result) => {
//   //   if (err) throw err;
//   //   res.send(result[0]);
//   // })
// })

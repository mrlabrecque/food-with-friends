const express = require('express');

const router = express.Router();

//Controllers
const groupController = require('../controllers/group.controller');

//Group routes
router.get('/groups', groupController.findAll);

module.exports = router;

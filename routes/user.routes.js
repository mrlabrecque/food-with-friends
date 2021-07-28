const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.post('/new', userController.createUser);
router.delete('/remove', userController.removeUser);

module.exports = router;

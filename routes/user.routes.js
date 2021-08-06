const express = require('express');
const userController = require('../controllers/user.controller');
const passport = require('passport');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);


router.put('/:id', userController.updateUser);

router.post('/getusersbyemails', userController.getUsersByEmails);
router.post('/new', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/special', passport.authenticate('jwt'));

router.delete('/remove', userController.removeUser);

module.exports = router;

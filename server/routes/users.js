var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user-controller')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/loginFacebook', UserController.logInFacebook);

module.exports = router;

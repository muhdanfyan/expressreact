//import express
const express = require('express')

//init express router
const router = express.Router();

// import verifyToken
const verifyToken = require('../middleware/auth');


//import register controller
const registerController = require('../controllers/RegisterController');

//import login controller
const loginController = require('../controllers/LoginController');

// import user controller
const userController = require('../controllers/UserController');

//import validate register
const { validateRegister, validateLogin } = require('../utils/validators/auth');
const { verify } = require('jsonwebtoken');

//define route for register
router.post('/register', validateRegister, registerController.register);

// define route for login
router.post('/login', validateLogin, loginController.login);

// define route for user
router.get('admin/users', verifyToken, userController.findUsers);

//export router
module.exports = router
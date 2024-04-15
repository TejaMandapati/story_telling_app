const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

//GET /users/new: send html form for user registration or for user signup
router.get('/new', controller.new);

//GET /users/login: send login form for user to sign in
router.get('/login', controller.login);

//GET /users/profile: send welcome page
router.get('/profile', controller.profile);

//GET /users/logout: logout the user by destroying session ID
router.get('/logout', controller.logout);

//POST /users: create's the new user
router.post('/', controller.create);

//POST /users/login: process the login
router.post('/login', controller.loginUser);

module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const userController = new UserController();
const { validateSignUp, validateSignIn, authourizeResource } = require('../helpers/request-validation');


router.get('/', userController.search);
router.post('/signup', validateSignUp(), userController.signUp);
router.post('/signin', authourizeResource, validateSignIn(), userController.signIn);

module.exports = router;




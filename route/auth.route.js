const express = require('express');

const route = express.Router();

const authControllers = require('../controller/auth.controller')


route.get('/login',authControllers.getLogin);

route.post('/login', authControllers.login);

route.get('/signup', authControllers.getSignUp);

route.post('/signup',authControllers.signup);



module.exports = route;
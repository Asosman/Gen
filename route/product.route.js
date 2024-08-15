const express = require('express');
const productController = require('../controller/product.controller')


const route = express.Router();


route.get('/',productController.getProducts);



module.exports = route;
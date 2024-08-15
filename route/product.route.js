const express = require('express');
const productController = require('../controller/product.controller')


const route = express.Router();


route.get('/all-products',productController.getProducts)



module.exports = route;
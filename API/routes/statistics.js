const express = require('express')
const router = express.Router();

const {
    getCountOfAllProducts
} = require('../controllers/products');
const {
    getCountOfAllOrders
} = require('../controllers/orders');

router.get('/orders', getCountOfAllOrders)
router.get('/products', getCountOfAllProducts)

module.exports = router;
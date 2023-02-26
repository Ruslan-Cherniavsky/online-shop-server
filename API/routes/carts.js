const express = require('express')
const router = express.Router();
const verifyAdminToken = require('../middlewares/checkAdminAuth')


const {
    getAllCarts,
    createCart,
    getCart,
    deleteCart,
    getLastCartsByUserId
} = require('../controllers/carts');


router.post('/', createCart)
router.get('/:cartId', getCart)
router.get('/byuserid/:userId', getLastCartsByUserId)
router.delete('/:cartId', deleteCart)


router.get('/', verifyAdminToken, getAllCarts)

module.exports = router;
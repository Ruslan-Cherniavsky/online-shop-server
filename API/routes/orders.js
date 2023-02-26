const express = require('express')
const router = express.Router();
const verifyAdminToken = require('../middlewares/checkAdminAuth')

const {
    getAllOrders,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orders');


router.post('/', createOrder)

router.get('/:orderId', verifyAdminToken, getOrder)
router.patch('/:orderId', verifyAdminToken, updateOrder)
router.delete('/:orderId', verifyAdminToken, deleteOrder)
router.get('/', verifyAdminToken, getAllOrders)

module.exports = router;
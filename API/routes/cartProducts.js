const express = require('express')
const router = express.Router();
const verifyAdminToken = require('../middlewares/checkAdminAuth')

//const upload = require('../middlewares/upload')

const {
    getAllCartProducts,
    createCartProduct,
    getCartProduct,
    deleteCartProduct,
    updateCartProduct,
    getCartProductsByCartId,
    deleteCartProductsByCartId
} = require('../controllers/cartProducts');


router.post('/', createCartProduct)
router.patch('/:cartProductId', updateCartProduct)
router.get('/:cartProductId', getCartProduct)
router.get('/cartId/:cartId', getCartProductsByCartId)
router.delete('/:cartProductId', deleteCartProduct)
router.delete('/deleteallbycartid/:cartid', deleteCartProductsByCartId)

router.get('/', verifyAdminToken, getAllCartProducts)

module.exports = router;
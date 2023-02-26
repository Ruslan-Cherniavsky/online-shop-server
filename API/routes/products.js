const express = require('express')
const router = express.Router();
const verifyAdminToken = require('../middlewares/checkAdminAuth')

//const upload = require('../middlewares/upload')

const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getPostPaginAll,
  getPostPaginByCategory
} = require('../controllers/products');


router.get('/', getAllProducts)
router.get('/pagin', getPostPaginAll)
router.get('/:productId', getProduct)

router.get('/bycategory/:categoryid', getPostPaginByCategory)

router.post('/', verifyAdminToken, createProduct)
router.patch('/:productId', verifyAdminToken, updateProduct)
router.delete('/:productId', verifyAdminToken, deleteProduct)






module.exports = router;



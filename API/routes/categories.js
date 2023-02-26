const express = require('express')
const router = express.Router();
const verifyAdminToken = require('../middlewares/checkAdminAuth')


const {
    getAllCategories,
    createCategories,
    getCategory,
    updateCategories,
    deleteCategories
} = require('../controllers/categories');

router.get('/', getAllCategories)
router.get('/:categoryId', getCategory)

router.post('/', verifyAdminToken, createCategories)
router.patch('/:categoryId', verifyAdminToken, updateCategories)
router.delete('/:categoryId', verifyAdminToken, deleteCategories)


module.exports = router;

const mongoose = require('mongoose')
const Product = require('../models/product')
const Category = require('../models/category')


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId', 'categoryName')
        if (!products) { return res.status(404).json({ message: 'Products not found!' }) }
        return res.status(200).json({ products })
    } catch (error) { return res.status(500).json({ error }) }
}

const getCountOfAllProducts = async (req, res) => {
    try {
        const totalProducts = await Product.count()
        if (!totalProducts) { return res.status(404).json({ message: 'Products not found!' }) }

        return res.status(200).json({ totalProducts })
    } catch (error) { return res.status(500).json({ error }) }
}




const createProduct = async (req, res) => {
    const { name, categoryId, price, image } = req.body
    // const { path } = req.file;
    try {
        if (categoryId) {
            const category = await Category.findById(categoryId)
            if (!category) { return res.status(404).json({ message: 'Category not found!' }) }
        }


        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            categoryId: categoryId,
            price: price,
            image: image
        });
        await product.save()
        return res.status(200).json({ message: 'Created product' })
    } catch (error) { return res.status(500).json({ error }) }
}


const getProduct = async (req, res) => {
    const productId = req.params.productId
    try {
        const product = await Product.findById(productId)
        if (!product) { return res.status(404).json({ message: 'Product not found!' }) }
        return res.status(200).json({ product })
    } catch (error) { return res.status(500).json({ error }) }
}


const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const { categoryId } = req.body
    try {
        if (categoryId) {
            const category = await Category.findById(categoryId)
            if (!category) { return res.status(404).json({ message: 'Category not found!' }) }
        }

        await Product.updateOne({ _id: productId }, req.body)
        return res.status(200).json({ message: 'Product Updated' })
    } catch (error) { return res.status(500).json({ error }) }
}


const deleteProduct = async (req, res) => {
    const productId = req.params.productId
    try {
        const product = await Product.findById(productId)
        if (!product) { return res.status(404).json({ message: 'Product not found!' }) }

        await Product.deleteOne({ _id: productId })
        return res.status(200).json({ message: `Product id: ${productId} Deleted` })
    } catch (error) { return res.status(500).json({ error }) }

}


const getPostPaginAll = async (req, res) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Product.find();
    let fetchedProducts;
    if (pageSize && currentPage) { postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize) }


    try {
        const documents = await postQuery
        fetchedProducts = documents
        const count = await Product.count()

        return res.status(200).json({
            message: 'Post fetched succesfully',
            products: fetchedProducts,
            maxproducts: count
        })
    } catch (error) { return res.status(500).json({ error }) }

};


const getPostPaginByCategory = async (req, res) => {
    const categoryId = req.params.categoryid
    console.log(req.params.categoryid)

    try {

        const category = await Category.find()
        if (!category) { return res.status(404).json({ message: 'Category not found!' }) }

        console.log(categoryId)

        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.page;
        const postQuery = Product.find().where("categoryId").equals(categoryId)
        let fetchedProducts;
        if (pageSize && currentPage) { postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize) }

        const documents = await postQuery
        fetchedProducts = documents
        const count = await Product.count()

        return res.status(200).json({
            message: 'Post fetched succesfully',
            products: fetchedProducts,
            maxproducts: count
        })
    } catch (error) { return res.status(500).json({ error }) }

};




module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getCountOfAllProducts,
    getPostPaginAll,
    getPostPaginByCategory
}
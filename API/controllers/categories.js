const mongoose = require('mongoose')
const Category = require("../models/category")


const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        if (!categories) { return res.status(404).json({ message: 'Categories not found!' }) }
        return res.status(200).json({ categories })
    } catch (error) { return res.status(500).json({ error }) }
}


const createCategories = async (req, res) => {
    const { categoryName } = req.body
    try {
        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            categoryName: categoryName
        })
        await category.save()
        return res.status(200).json({ message: `Created category - ${categoryName}` })
    } catch (error) { return res.status(500).json({ error }) }
}


const getCategory = async (req, res) => {
    const categoryId = req.params.categoryId
    try {
        const category = await Category.findById(categoryId)
        if (!category) { return res.status(404).json({ message: 'Category not found!' }) }
        return res.status(200).json({ category })
    } catch (error) { return res.status(500).json({ error }) }
}


const updateCategories = async (req, res) => {
    const categoryId = req.params.categoryId
    try {
        const category = await Category.findById(categoryId)
        if (!category) { return res.status(404).json({ message: 'Category not found!' }) }
        await Category.updateOne({ _id: categoryId }, req.body)
        return res.status(200).json({ message: `update category ${categoryId}` })
    } catch (error) { return res.status(500).json({ error }) }
}


const deleteCategories = async (req, res) => {
    const categoryId = req.params.categoryId
    try {
        const category = await Category.findById(categoryId)
        if (!category) { return res.status(404).json({ message: 'Category not found!' }) }
        await Category.deleteOne({ _id: categoryId })
        return res.status(200).json({ message: `Category id: ${categoryId} Deleted` })
    } catch (error) { return res.status(500).json({ error }) }
}


module.exports = {
    getAllCategories,
    createCategories,
    getCategory,
    updateCategories,
    deleteCategories
}
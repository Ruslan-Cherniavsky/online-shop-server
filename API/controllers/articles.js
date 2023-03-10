
const mongoose = require('mongoose')
const article = require('../models/article')
const Article = require('../models/article')
const Category = require('../models/category')

module.exports = {
    getAllArticles: (req, res) => {
        Article.find().populate('categoryId', 'title').then((articles) => {
            res.status(200).json({
                articles
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    createArticle: (req, res) => {
        const { title, description, content, categoryId } = req.body
        const { path } = req.file;

        Category.findById(categoryId).then((category) => {
            if (!category) {
                return res.status(404).json({
                    message: 'Category not found!'
                })
            }
            const article = new Article({
                _id: new mongoose.Types.ObjectId(),
                title: title,
                description: description,
                content: content,
                categoryId: categoryId,
                image: path.replace('\\', '/')
            });

            return article.save()
        }).then(() => {
            res.status(200).json({
                message: 'Created Article'
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    getArticle: (req, res) => {
        const articleId = req.params.articleId
        Article.findById(articleId).then((article) => {
            res.status(200).json({
                article
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    updateArticle: (req, res) => {
        const articleId = req.params.articleId;
        const { categoryId } = req.body

        Article.findById(articleId).then((article) => {
            if (!article) {
                return res.status(404).json({
                    message: 'Article not found!'
                })
            }
        }).then(() => {
            if (categoryId) {
                return Category.findById(categoryId).then((category) => {
                    if (!category) {
                        return res.status(404).json({
                            message: 'Category not found!'
                        })
                    }
                    return Article.updateOne({ _id: articleId }, req.body)
                }).then(() => {
                    res.status(200).json({
                        message: 'Article Updated'
                    })
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                })
            }
            Article.updateOne({ _id: articleId }, req.body).then(() => {
                res.status(200).json({
                    message: 'Article Updated'
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            })
        })
    },
    deleteArticle: (req, res) => {
        const articleId = req.params.articleId

        Article.findById(articleId).then((article) => {
            if (!article) {
                return res.status(404).json({
                    message: 'Article not found!'
                })
            }
        }).then(() => {
            Article.deleteOne({ _id: articleId }).then(() => {
                res.status(200).json({
                    message: `Article id: ${articleId} Deleted`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            })
        })
    }
}
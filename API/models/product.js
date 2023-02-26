const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, }
});

module.exports = mongoose.model('Product', productsSchema)
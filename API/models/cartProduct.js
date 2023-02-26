const mongoose = require('mongoose')

const cartProduct = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    price: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number },
    cartId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cart' },
});

module.exports = mongoose.model('CartProduct', cartProduct)
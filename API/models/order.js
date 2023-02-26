const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    cartId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cart' },
    totalPrice: { type: Number, required: true, min: 0 },
    city: { type: String, required: true },
    street: { type: String, required: true },
    date: { type: Date, required: true },
    createdAt: { type: Date, immutable: true, default: () => Date.now() },
    creditCard: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Order', orderSchema)
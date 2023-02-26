const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

module.exports = mongoose.model('Cart', cartSchema)
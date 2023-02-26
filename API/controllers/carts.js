
const mongoose = require('mongoose')
const { use } = require('../../app')
const Cart = require('../models/cart')
const User = require('../models/user')


const getAllCarts = async (req, res) => {
    try {
        const cart = await Cart.find().populate('userId', 'email')
        return res.status(200).json({ cart })
    } catch (error) { { res.status(500).json({ error }) } }
}

//******* */

const getLastCartsByUserId = async (req, res) => {
    const userId = req.params.userId



    try {
        const carts = await Cart.find().where('userId').equals(userId)

        //console.log(carts[0])

        if (!carts[0]) {
            return res.status(200).json({ carts })

        }

        const cart = await Cart.find().where('userId').equals(userId).sort({ "datetime": -1 }).limit(1)
        console.log(cart[0]._id)
        const cartId = cart[0]._id
        return res.status(200).json({ cartId })
    } catch (error) { { res.status(500).json({ error }) } }
}


const createCart = async (req, res) => {
    const { userId } = req.body
    try {
        const user = await User.findById(userId)
        if (!user) { return res.status(404).json({ message: 'User not found!' }) }

        const cart = new Cart({
            _id: new mongoose.Types.ObjectId(),
            userId: userId
        });

        await cart.save()
        return res.status(200).json({ message: `Created new Cart` })
    } catch (error) { { res.status(500).json({ error }) } }

}

const getCart = async (req, res) => {
    const cartId = req.params.cartId
    try {
        const cart = await Cart.findById(cartId).populate('userId', 'email')
        return res.status(200).json({ cart })
    } catch (error) { { res.status(500).json({ error }) } }
}




const updateCart = async (req, res) => {
    const cartId = req.params.cartId;
    const { userId } = req.body
    try {
        const cart = await Cart.findById(cartId)
        if (!cart) { return res.status(404).json({ message: 'Cart not found!' }) }
        if (userId) {
            const user = await User.findById(userId)
            if (!user) { return res.status(404).json({ message: 'User not found!' }) }
        }
        await Cart.updateOne({ _id: cartId }, req.body)
        return res.status(200).json({ message: 'Cart Updated' })
    } catch (error) { { res.status(500).json({ error }) } }

}


const deleteCart = async (req, res) => {
    const cartId = req.params.cartId
    try {
        const cart = await Cart.findById(cartId)
        if (!cart) { return res.status(404).json({ message: 'Cart not found!' }) }
        await Cart.deleteOne({ _id: cartId })
        return res.status(200).json({ message: `Cart id: ${cartId} Deleted` })
    } catch (error) { { res.status(500).json({ error }) } }
}


module.exports = {
    getAllCarts,
    createCart,
    getCart,
    updateCart,
    deleteCart,
    getLastCartsByUserId
}
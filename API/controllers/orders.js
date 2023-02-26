
const mongoose = require('mongoose')
const Order = require('../models/order')
const User = require('../models/user')
const Cart = require('../models/cart')
const CartProducts = require('../models/cartProduct')


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        //.populate('userId', 'firstName').populate('cartId', 'userId')
        return res.status(200).json({ orders })
    }
    catch (error) { res.status(500).json({ error }) }
}


const createOrder = async (req, res) => {
    const { userId, cartId, city, street, date, createdAt, creditCard } = req.body

    try {
        const cart = await Cart.findById(cartId)
        const user = await User.findById(userId)
        if (!cart) { return res.status(404).json({ message: 'Cart not found!' }) }
        if (!user) { return res.status(404).json({ message: 'User not found!' }) }

        const cartProducts = await CartProducts
            .where("cartId")
            .equals(cartId)
            .select("totalPrice")
            .populate("productId")

        let cartProductsTotalPrice = 0
        cartProducts.map((cartProduct) => {
            cartProductsTotalPrice += cartProduct.totalPrice
        })

        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            userId: userId,
            cartId: cartId,
            totalPrice: cartProductsTotalPrice,
            city: city,
            street: street,
            date: date,
            createdAt: createdAt,
            creditCard: creditCard
        });

        await order.save()
        return res.status(200).json({ message: 'Created Order' })

    } catch (error) { res.status(500).json({ error }) }
}


const getOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const order = await Order.findById(orderId)
        if (!order) { return res.status(404).json({ message: 'Order not found!' }) }
        return res.status(200).json({ order })
    }
    catch (error) { res.status(500).json({ error }) }
}


const updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const { userId, cartId } = req.body

    try {
        const order = await Order.findById(orderId)
        if (!order) { return res.status(404).json({ message: 'Order not found!' }) }
        if (userId) {
            const user = await User.findById(userId)
            if (!user) { return res.status(404).json({ message: 'User not found!' }) }
        }
        if (cartId) {
            const cart = await Cart.findById(cartId)
            if (!cart) { return res.status(404).json({ message: 'Cart not found!' }) }
        }
        await Order.updateOne({ _id: orderId }, req.body)
        return res.status(200).json({ message: 'Order Updated' })
    }
    catch (error) { res.status(500).json({ error }) }
}


const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId
    try {
        const order = await Order.findById(orderId)
        if (!order) { return res.status(404).json({ message: 'Order not found!' }) }
        await Order.deleteOne({ _id: orderId })
        return res.status(200).json({ message: `Order id: ${orderId} Deleted` })
    }
    catch (error) { res.status(500).json({ error }) }
}


const getCountOfAllOrders = async (req, res) => {
    try {
        const totalOrders = await Order.count()
        if (!totalOrders) { return res.status(404).json({ message: 'Orders not found!' }) }

        return res.status(200).json({ totalOrders })
    } catch (error) { return res.status(500).json({ error }) }
}


module.exports = {
    getAllOrders,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getCountOfAllOrders
}
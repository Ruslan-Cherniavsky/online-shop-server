
const mongoose = require('mongoose')
const CartProduct = require('../models/cartProduct')
const Product = require('../models/product')
const Cart = require('../models/cart')


const getAllCartProducts = async (req, res) => {
    try {
        const cartProducts = await CartProduct.find().populate('productId')
        //.populate('cartId').populate('cartId')
        if (!cartProducts) { res.status(404).json({ message: 'Cart products not found!' }) }
        return res.status(200).json({ cartProducts })
    } catch (error) { { res.status(500).json({ error }) } }
}


const createCartProduct = async (req, res) => {
    const { productId, quantity, cartId } = req.body
    try {
        const cart = await Cart.findById(cartId)
        const product = await Product.findById(productId)
        if (!cart) { return res.status(404).json({ message: 'Cart not found!' }) }
        if (!product) { return res.status(404).json({ message: 'Product not found!' }) }

        const cartProduct = new CartProduct({
            _id: new mongoose.Types.ObjectId(),
            productId: productId,
            quantity: quantity,
            price: product.price,
            totalPrice: quantity * product.price,
            cartId: cartId
        });
        await cartProduct.save()
        return res.status(200).json({ message: 'Created cart Product' })
    } catch (error) { { res.status(500).json({ error }) } }

}

const updateCartProduct = async (req, res) => {
    const cartProductId = req.params.cartProductId
    const { productId, cartId } = req.body
    try {
        const cartProduct = await CartProduct.findById(cartProductId)
        if (!cartProduct) { return res.status(404).json({ message: 'Cart product not found!' }) }
        if (cartId) {
            const cart = await Cart.findById(cartId)
            if (!cart) { return res.status(404).json({ message: 'Cart not found!' }) }
        }
        if (productId) {
            const product = await Product.findById(productId)
            if (!product) { return res.status(404).json({ message: 'product not found!' }) }
        }
        await CartProduct.updateOne({ _id: cartProductId }, req.body)
        return res.status(200).json({ message: 'Cart product Updated!!!!' })
    } catch (error) { { res.status(500).json({ error }) } }
}


const getCartProduct = async (req, res) => {
    try {
        const cartProductId = req.params.cartProductId
        const cartProduct = await CartProduct.findById(cartProductId).populate('productId').populate('cartId')
        return res.status(200).json({ cartProduct })
    } catch (error) { { res.status(500).json({ error }) } }
}

const getCartProductsByCartId = async (req, res) => {
    const cartId = req.params.cartId
    try {
        const cart = await Cart.findById(cartId)
        if (!cart) { return res.status(404).json({ message: 'Cart not found!' }) }



        const cartProducts = await CartProduct.where('cartId')
            .equals(cartId)
            //.select("price")
            .populate("productId")
        //.populate("cartId")


        return res.status(200).json({ cartProducts })
    } catch (error) { { res.status(500).json({ error }) } }
}


const deleteCartProductsByCartId = async (req, res) => {
    const cartId = req.params.cartid
    try {
        const cart = await Cart.findById(cartId)
        if (!cart) { return res.status(404).json({ message: 'Cart not found!' }) }

        const cartProducts = await CartProduct.where('cartId')
            .equals(cartId)
        if (!cartProducts[0]) { return res.status(404).json({ message: 'There is no products in this cart' }) }

        await CartProduct.deleteMany({ cartId: cartId })

        return res.status(200).json({ message: `All cart products in cart id ${cartId} is DELETED!!!!!!!! AHAHAHAAA!!` })
    } catch (error) { { res.status(500).json({ error }) } }
}


const deleteCartProduct = async (req, res) => {
    const cartProductId = req.params.cartProductId
    try {
        const cartProduct = await CartProduct.findById(cartProductId).populate('productId')
        if (!cartProduct) { return res.status(404).json({ message: 'Product not found in cart!' }) }

        await CartProduct.deleteOne({ _id: cartProductId })
        return res.status(200).json({ message: `Cart Product id: ${cartProductId}, name: ${cartProduct.productId.name} Deleted` })
    } catch (error) { { res.status(500).json({ error }) } }
}


module.exports = {
    getAllCartProducts,
    createCartProduct,
    getCartProduct,
    deleteCartProduct,
    updateCartProduct,
    getCartProductsByCartId,
    deleteCartProductsByCartId
}
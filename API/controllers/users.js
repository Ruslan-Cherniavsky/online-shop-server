const mongoose = require('mongoose');
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const md5 = require('md5');


const signup = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        city,
        street,
        role
    } = req.body;

    try {
        const users = await User.find({ email })
        if (users.length >= 1) { return res.status(409).json({ message: 'Email exists!' }) }

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: md5(password),
            city: city,
            street: street,
            role: role
        });

        await user.save()
        console.log(user);
        return res.status(200).json({ message: 'User Created !' })
    } catch (error) { return res.status(500).json({ error }) }

}


const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const users = await User.find({ email })
        if (users.length === 0) { return res.status(401).json({ message: 'Auth failed!' }) }
        const [user] = users;

        if (user.password !== md5(password)) { return res.status(404).json({ message: 'Auth failed!' }) }

        const token = jwt.sign({
            firstName: user.firstName,
            email: user.email,
            id: user._id,
            role: user.role,
            city: user.city,
            street: user.street
        }, process.env.JWT_KEY, { expiresIn: '50H' })

        return res.status(200).json({ message: 'Auth success!', token: token })
    } catch (error) { return res.status(500).json({ error }) }
}


module.exports = {
    signup,
    login
}
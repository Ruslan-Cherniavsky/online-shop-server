const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const verifyToken = require('./API/middlewares/checkAuth');
require('dotenv').config()

const { PORT } = process.env;


app.use(morgan("dev"))
app.use(cors({ origin: "*", }))
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ruslan-test.odepovq.mongodb.net/node-angular?retryWrites=true&w=majority`)
    .then(() => { console.log('Conected to data base Woohoo!'); })
    .catch(() => { console.log('Conection failed! T___T'); });

const getCountOfAllProducts = require('./API/routes/products')
const checkUserAutchData = require('../.SERVER/API/middlewares/checkUserAuthData')

const articlesRoutes = require('./API/routes/articles');

const productsRoutes = require('./API/routes/products');
const cartsRoutes = require('./API/routes/carts');
const cartProductsRoutes = require('./API/routes/cartProducts');
const ordersRoutes = require('./API/routes/orders');

const categoriesRoutes = require('./API/routes/categories');
const usersRoutes = require('./API/routes/users');
const statisticsRouts = require('./API/routes/statistics')


//app.use('/uploads', express.static('uploads') )
app.use('/users', usersRoutes)
app.use('/statistics', statisticsRouts)

app.use(verifyToken)

app.get('/usercheck', checkUserAutchData)

app.use('/articles', articlesRoutes)
app.use('/products', productsRoutes)
app.use('/carts', cartsRoutes)
app.use('/cartproducts', cartProductsRoutes)
app.use('/orders', ordersRoutes)

app.use('/categories', categoriesRoutes)


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'hey '
    })
})


app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error)
})


app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})





app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)
})


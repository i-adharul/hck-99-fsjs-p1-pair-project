const express = require('express');
const Controller = require('./controllers/controller');
const app = express()
const port = 3000

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
//setup router nanti jangan lupa
//middleware & session

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

//butuh route logout
app.get('/', Controller.landing)
app.get('/register', Controller.register)
app.get('/login', Controller.login)
app.get('/cms', Controller.cms) //jangan lupa protect role
app.post('/cms', Controller.postCoupon) //jangan lupa protect role
app.get('/coupons', Controller.coupons)
app.get('/coupons/:couponId', Controller.couponDetail)
app.get('/checkout', Controller.checkout)
app.get('/payments', Controller.payments)
app.get('/payments/status', Controller.paymentStatus)
app.get('/payments/status/success', Controller.paymentSuccess)
app.get('/profile', Controller.profile)
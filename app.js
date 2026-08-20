const express = require('express');
const Controller = require('./controllers/controller');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
//setup router nanti jangan lupa

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.get('/', Controller.home)
app.get('/register', Controller.home)
app.get('/login', Controller.home)
app.get('/cms', Controller.home) //jangan lupa protect role
app.post('/cms', Controller.home)
app.get('/coupons', Controller.home)
app.get('/coupons/:couponId', Controller.home)
app.get('/checkout', Controller.home)
app.get('/payments', Controller.home)
app.get('/payments/status', Controller.home)
app.get('/payments/status/success', Controller.home)
app.get('/profile', Controller.home)
const express = require('express');
const Controller = require('./controllers/controller');
const app = express()
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'kupota-secret',
    resave: false, //tidak menyimpan sesi selama tidak ada perubahan
    saveUninitialized: false, //objek sesi kosong tidak disimpan
    cookie: {
        secure: false, // allow html
        sameSite: true // secure from csrf attack
    }
}))

// const isLoggedIn = function (req, res, next) {
//     if(!req.session.email){
//         const error = "Please login first."
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }
// }

const isAdmin = function (req, res, next) {
    if (req.session.email && req.session.role !== 'admin') {
        const error = "You have no access."
        // console.log("error >>>>", error);
        // console.log(req.session);
        res.redirect(`/login?error=${error}`)
    } else {
        // console.log("isAdmin >>>>", req.session);
        next()
    }
}
//setup router nanti jangan lupa
//setup router disini

app.get('/', Controller.landing)
app.get('/register', Controller.register)
app.post('/register', Controller.postRegister) //validate findOne, email sudah digunakan, password tidak mengandung apa
app.get('/login', Controller.login)
app.post('/login', Controller.postLogin)

app.get('/cms', Controller.cms) //nanti dihapus
app.post('/cms', Controller.postCoupon) //nanti dihapus

app.use(
    function (req, res, next) {
        if (!req.session.email) {
            const error = "Please login first."
            // console.log("error >>>>", error);
            // console.log(req.session);
            res.redirect(`/login?error=${error}`)
        } else {
            // console.log("isLoggedIn >>>>", req.session);
            next()
        }
    })
//nanti dimasukkan ke router.use(isLoggedIn) //yang app.use ga udah dipakai, uncomment fun isLoggedIn waktu 1:36

app.get('/checkout', Controller.checkout)
app.get('/payments', Controller.payments)
app.get('/payments/status', Controller.paymentStatus)
app.get('/payments/status/success', Controller.paymentSuccess)
app.get('/profile', Controller.profile)

// app.get('/cms', isAdmin, Controller.cms)
// app.post('/cms', isAdmin, Controller.postCoupon)

app.get('/logout', Controller.logout)
app.get('/coupons/add', Controller.coupons) // nanti di redirect ke '/'
app.get('/coupons/add', Controller.addCoupon)
app.get('/coupons/post', Controller.postCoupon)
app.get('/coupons/:couponId', Controller.couponDetail)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
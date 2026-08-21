const Controller = require('../controllers/controller');
const router = require('express').Router()
const Register = require("./register.js")
const Login = require("./login")
const Profile = require("./profile")
const Coupon = require("./coupons")
const Logout = require("./logout")


router.get('/', Controller.landing)
router.use('/register', Register)
router.use('/login', Login)

//Login session
router.use(
    function (req, res, next) {
        if (!req.session.email) {
            const error = "Please login first."
            // console.log("error >>>>", error);
            // console.log(req.session);
            return res.redirect(`/login?error=${error}`)
        }
        // console.log("isLoggedIn >>>>", req.session);
        next()
    })

router.use('/profile', Profile)
router.use('/logout', Logout)

router.use('/coupons', Coupon)

module.exports = router
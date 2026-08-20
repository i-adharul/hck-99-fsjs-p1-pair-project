const {
    Category,
    Coupon,
    Order,
    OrderItem,
    Payment,
    Profile,
    User
} = require('../models');
const { Op } = require('sequelize')
const formatPrice = require('../helpers/helper')
const bcrypt = require('bcryptjs')

class Controller {
    static async landing(req, res) {
        try {
            let { search, category } = req.query
            let coupons = await Coupon.getCouponsByCategory(search, category)
            let cat = await Category.findAll()
            res.render('landingPage', { coupons, cat, formatPrice })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async register(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            const { email, password } = req.body
            await User.create({
                email,
                password_hash: password
            })
            res.render('coupons')
        } catch (error) {
            res.send(error)
        }
    }

    static async login(req, res) {
        try {
            const { error } = req.query
            res.render('login', { error })
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            const { email, password } = req.body
            let user = await User.findOne({ where: { email } })
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password_hash)

                if (isValidPassword) {
                    return res.redirect('/')
                } else {
                    const error = "Invalid email or password."
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = "Invalid email or password."
                return res.redirect(`/login?error=${error}`)
            }
        } catch (error) {
            res.send(error.message)
        }
    }

    static async cms(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    static async postCoupon(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    static async coupons(req, res) {
        try {
            let coupons = await Coupon.findAll({
                include: Category
            })
            res.send(coupons)
        } catch (error) {
            res.send(error)
        }
    }

    static async couponDetail(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    static async checkout(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    static async payments(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    static async paymentStatus(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    static async paymentSuccess(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    static async profile(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller
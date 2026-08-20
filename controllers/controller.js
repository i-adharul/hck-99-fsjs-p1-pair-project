const {
    Category,
    Coupon,
    Order,
    OrderItem,
    Payment,
    Profile,
    User
} = require('../models');
const { Op, where } = require('sequelize')
const formatPrice = require('../helpers/helper')
const bcrypt = require('bcryptjs')

class Controller {
    static async landing(req, res) {
        try {
            let { search, category } = req.query
            let coupons = await Coupon.getCouponsByCategory(search, category)
            let cat = await Category.findAll()
            // let isLoggedIn = req.session.email || null
            res.render('landingPage', { coupons, cat, formatPrice })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async register(req, res) {
        try {
            const { error } = req.query
            res.render('register', { error })
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            const { email, password } = req.body
            let user = await User.findOne({ where: { email } })
            if (user) {
                const error = "Email already exist."
                return res.redirect(`/register?error=${error}`)
            }
            await User.create({
                email,
                password_hash: password
            })
            res.redirect('/login')
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map(obj => obj.message)
                res.redirect(`/register?error=${errors}`)
            } else {
                res.send(error.message)
            }
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
            // console.log({ email, password });
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password_hash)

                // console.log(isValidPassword);
                if (isValidPassword) {
                    //set session
                    req.session.email = user.email
                    req.session.role = user.role
                    if (user.role === 'admin') {
                        return res.redirect('/cms')
                    } else {
                        return res.redirect('/')
                    }
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
            let { search, category } = req.query
            let coupons = await Coupon.getCouponsByCategory(search, category)
            let cat = await Category.findAll()
            res.render('cms', { coupons, cat, formatPrice })
        } catch (error) {
            res.send(error)
        }
    }

    static async coupons(req, res) {
        try {
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }

    static async addCoupon(req, res) {
        try {
            // next release
        } catch (error) {
            res.send(error)
        }
    }

    static async postCoupon(req, res) {
        try {
            // next release
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
            // next release
        } catch (error) {
            res.send(error)
        }
    }

    static async paymentStatus(req, res) {
        try {
            // next release
        } catch (error) {
            res.send(error)
        }
    }

    static async paymentSuccess(req, res) {
        try {
            // next release
        } catch (error) {
            res.send(error)
        }
    }

    static async profile(req, res) {
        try {
            let user = await User.findOne({
                where: {
                    email: req.session.email
                },
                include: [Profile]
            });

            res.render('profile', {
                user: user,
                profile: user.Profile
            });
        } catch (error) {
            res.send(error.message)
        }
    }

    static async deleteProfile(req, res) {
        try {
            
        } catch (error) {
            res.send(error.message)
        }
    }

    static async editProfile(req, res) {
        try {
            
        } catch (error) {
            res.send(error.message)
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy(res.redirect('login'))
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller
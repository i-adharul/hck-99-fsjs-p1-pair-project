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
const qrcode = require('qrcode');

class Controller {
    //index
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

    //register
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
            } else {
                await User.create({
                    email,
                    password_hash: password
                })
                res.redirect('/login')
            }
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map(obj => obj.message)
                res.redirect(`/register?error=${errors}`)
            } else {
                res.send(error.message)
            }
        }
    }

    //login
    static async login(req, res) {
        try {
            if (req.session.email) {
                return res.redirect('/');
            }
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
                        return res.redirect('/coupons')
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

    //coupons
    static async coupons(req, res) {
        try {
            let { search, category, deletedCoupon } = req.query
            let coupons = await Coupon.getCouponsByCategory(search, category)
            let cat = await Category.findAll()
            res.render('coupons', { coupons, cat, formatPrice, deletedCoupon })
        } catch (error) {
            res.send(error)
        }
    }
    static async editCoupon(req, res) {
        try {
            const { couponId } = req.params
            let coupon = await Coupon.findByPk(couponId)
            let cat = await Category.findAll()
            res.render('editCoupon', { coupon, cat })
        } catch (error) {
            res.send(error)
        }
    }
    static async postEditCoupon(req, res) {
        try {
            const { couponId } = req.params
            let {
                title,
                category_id,
                description,
                price,
                stock,
                image,
                expired_date
            } = req.body
            await Coupon.update({
                title,
                category_id,
                description,
                price,
                stock,
                image,
                expired_date
            }, {
                where: {
                    id: couponId
                }
            })
            res.redirect('/coupons')
        } catch (error) {
            res.send(error)
        }
    }
    static async deleteCoupon(req, res) {
        try {
            const { couponId } = req.params
            let coupon = await Coupon.findByPk(couponId)
            await coupon.destroy()
            res.redirect(`/coupons?deletedCoupon=${coupon.title}`)
        } catch (error) {
            res.send(error)
        }
    }
    static async couponDetail(req, res) {
        try {
            const { couponId } = req.params;

            // 1. Ambil data kupon beserta kategorinya
            const coupon = await Coupon.findByPk(couponId, {
                include: [Category]
            });

            if (!coupon) {
                return res.status(404).send('Coupon not found');
            }

            // 2. Buat URL absolut untuk QR Code (Mengarahkan ke halaman detail kupon ini)
            const fullUrl = `${req.protocol}://${req.get('host')}/coupons/${coupon.id}`;
            const qrCodeUrl = await qrcode.toDataURL(fullUrl);

            res.render('couponDetail', {
                coupon,
                qrCodeUrl,
                formatPrice
            });

        } catch (error) {
            res.send(error.message);
        }
    }
    static async addCoupon(req, res) {
        try {
            // next release
        } catch (error) {
            res.send(error)
        }
    }
    static async postAddCoupon(req, res) {
        try {
            // next release
        } catch (error) {
            res.send(error)
        }
    }

    //profile
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

    //logout
    static async logout(req, res) {
        try {
            req.session.destroy(res.redirect('login'))
        } catch (error) {
            res.send(error)
        }
    }

    static async checkout(req, res) {
        try {
            // next release
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
}

module.exports = Controller
const {
    Category,
    Coupon,
    Order,
    OrderItem,
    Payment,
    Profile,
    User
} = require('../models');
const {Op} = require('sequelize')

class Controller {
    static async landing(req, res) {
        try {
            let { search } = req.query
            let option = {
                include: Category,
                where: {}
            }
            if (search) {
                option.where = {
                    [Op.or]: [
                        {
                            title: {
                                [Op.iLike]: `%${search}%`
                            }
                        },
                        {
                            description: {
                                [Op.iLike]: `%${search}%`
                            }
                        }
                    ]
                }
            }
            let coupons = await Coupon.findAll(option)
            res.render('landingPage', { coupons })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async register(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    static async login(req, res) {
        try {

        } catch (error) {
            res.send(error)
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
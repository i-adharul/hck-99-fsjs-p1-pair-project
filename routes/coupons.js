const Controller = require('../controllers/controller');
const router = require('express').Router()

//Cek session role
const isAdmin = function (req, res, next) {
    if (req.session.email && req.session.role !== 'admin') {
        const error = "You have no access."
        // console.log("error >>>>", error);
        // console.log(req.session);
        return res.redirect(`/?error=${error}`)
    }
    // console.log("isAdmin >>>>", req.session);
    next()

}

router.get('/', isAdmin, Controller.coupons)
// router.get('/add', isAdmin, Controller.addCoupon)
// router.get('/post', isAdmin, Controller.postAddCoupon)
router.get('/:couponId', Controller.couponDetail)
router.get('/:couponId/edit', isAdmin, Controller.editCoupon)
router.post('/:couponId/edit', isAdmin, Controller.postEditCoupon)
router.get('/:couponId/delete', isAdmin, Controller.deleteCoupon)

module.exports = router
const Controller = require('../controllers/controller');
const router = require('express').Router()

router.get('/', Controller.login)
router.post('/', Controller.postLogin)

module.exports = router
const Controller = require('../controllers/controller');
const router = require('express').Router()

router.get('/', Controller.register)
router.post('/', Controller.postRegister)

module.exports = router
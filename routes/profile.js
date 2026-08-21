const Controller = require('../controllers/controller');
const router = require('express').Router()

router.get('/', Controller.profile)
// router.get('/edit', Controller.editProfile)
// router.get('/delete', Controller.deleteProfile)

module.exports = router
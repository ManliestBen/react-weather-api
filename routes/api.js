const router = require('express').Router();
const apiCtrl = require('../controllers/api');

router.post('/weather', apiCtrl.getWeather)

module.exports = router;
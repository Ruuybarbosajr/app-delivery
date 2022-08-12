const router = require('express').Router();
const tokenValidation = require('../middlewares/tokenValidation');
const saleBodyValidation = require('../middlewares/saleBodyValidation');
const controller = require('../controllers');

router.post('/register', tokenValidation, saleBodyValidation, controller.sales.create);

module.exports = router;
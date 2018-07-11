const router = require("express").Router();

router.use('/about', require('./about'));
router.use('/contact', require('./contact'));

module.exports = router;

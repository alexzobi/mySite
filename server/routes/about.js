var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
module.exports = router;

// /about
router.get('/', function (req, res, next) {
  res.render('about')
});
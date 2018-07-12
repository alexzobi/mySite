var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
module.exports = router;

// /contact
router.get('/', function (req, res, next) {
  res.render('contact')
});

router.post('/', function (req, res, next) {
  console.log(req.body)
  res.redirect('/')
});
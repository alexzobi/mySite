var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
module.exports = router;

// /contact
router.get('/', function (req, res, next) {
  res.render('contact')
});

router.post('/', function (req, res, next) {
  console.log(req.body)
  const name = `${String(req.body.name)}` || ""
  const email = `${String(req.body.email)}` || "" 
  const location = `${String(req.body.city)}, 
                  ${String(req.body.state)}, 
                  ${String(req.body.country)}`
  const message = `${String(req.body.message)}`

  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.SEND_EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.SEND_EMAIL,
    to: process.env.RECEIVE_EMAIL,
    subject: 'But Why Website Visitor',
    text: 
      `From: ${name}\nEmail: ${email}\nLocation: ${location} \nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect('/')
});
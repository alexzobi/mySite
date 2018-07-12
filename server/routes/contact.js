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
  const mailer = process.env.SEND_EMAIL;
  const recipient = process.env.RECEIVE_EMAIL;
  const password = process.env.PASSWORD;
  console.log("INFO FOR EMAIL!!!!!   ", mailer, recipient, password)
  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: mailer,
      pass: password
    }
  });
  const mailOptions = {
    from: mailer,
    to: recipient,
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
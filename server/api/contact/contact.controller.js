/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /contact              ->  index
 * POST    /contact              ->  create
 * GET     /contact/:id          ->  show
 * PUT     /contact/:id          ->  update
 * DELETE  /contact/:id          ->  destroy
 */

'use strict';

var nodemailer = require('nodemailer');

var auth = {
  mail: {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: 'admin@depica.ro',
      pass: 'admin@!$'
    }
  }
};



var transporter = nodemailer.createTransport(auth.mail);


exports.send = function(req,res){
  var htmlContent = '<p>Name: ' + req.body.name + '</p>' +
                    '<p>Email: ' + req.body.email + '</p>' +
                    '<p>Message: ' + req.body.message + '</p>';
  var mailOptions = {
    to: 'hello@depica.ro',                  // your email here
    subject: req.body.subject,
    from: req.body.name + ' <' + req.body.email + '>',
    sender: req.body.email,
    html: htmlContent
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log('Failed to send email: ', err);
    }else{
      console.log('Message sent: ' + info.response);
      return res.status(201).json(info);
    }
  });

  transporter.close();
}
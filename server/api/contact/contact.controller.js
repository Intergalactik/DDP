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

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'eduard.nistru@gmail.com',    // your email here
    pass: 'intergalactik2@!$'          // your password here
  }
});

exports.send = function(req,res){
  var htmlContent = '<p>Name: ' + req.body.name + '</p>' +
                    '<p>Email: ' + req.body.email + '</p>' +
                    '<p>Message: ' + req.body.message + '</p>';
  var mailOptions = {
    to: 'eddy.nistru@gmail.com',                  // your email here
    subject: req.body.subject,
    from: req.body.name + ' <' + req.body.email + '>',
    sender: req.body.email,
    html: htmlContent
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
    }else{
      console.log('Message sent: ' + info.response);
      return res.json(201, info);
    }
  });

  transporter.close();
}
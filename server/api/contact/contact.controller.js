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


// var auth = {
//   auth: {
//     api_key: 'key-56b0dcc70e931b67dceed300d35d8881',
//     domain: 'sandbox54280b478fe1402a94b71dc1e59c37b9.mailgun.org'
//   }
// };

// var transporter = nodemailer.createTransport(mg(auth)
// {


  // service: 'Mailgun',
  // auth: {
  //   domain: 'sandbox54280b478fe1402a94b71dc1e59c37b9.mailgun.org',
  //   api_key: 'key-56b0dcc70e931b67dceed300d35d8881',
    // user: 'postmaster@sandbox54280b478fe1402a94b71dc1e59c37b9.mailgun.org',    // your email here
    // pass: '00daff8b754083f6e1db73e8c137cde7'          // your password here
  // }
// }
// );


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
      return res.status(201).json(info);
    }
  });

  transporter.close();
}
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Order = require('./order.model');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'eduard.nistru@gmail.com',    // your email here
    pass: 'intergalactik2@!$'          // your password here
  }
});

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Orders
exports.index = function(req, res) {
  Order.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Order from the DB
exports.show = function(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Order in the DB
exports.create = function(req, res) {
  Order.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Order in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Order from the DB
exports.destroy = function(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

// Sends an email with the Order
exports.send = function(req,res){

  var htmlContent = 
  '<h3>Order Details</h3>'+
  '<p><strong>Products: </strong>' + req.body.items.map(function(item){return item.name})  +' </p>'+
  '<p><strong>ID: </strong>' + req.body.items.map(function(item){return item.id})  +' </p>' +
  '<p><strong>Shipping: </strong>' + req.body.shipping + ' lei</p>' +
  '<p><strong>SubTotal: </strong>' + req.body.subTotal + ' lei</p>' +
  '<p><strong>TotalCost: </strong>' + req.body.totalCost + ' lei</p><hr>' +

  '<h3>Customer Details</h3>' +
  '<p><strong>Name: </strong>' + req.body.name + '</p>' +
  '<p><strong>Shipping Address: </strong>' + req.body.shippingAddress + '</p>' +
  '<p><strong>City: </strong>' + req.body.city + '</p>' +
  '<p><strong>Region: </strong>' + req.body.region + '</p>' +
  '<p><strong>Country: </strong>' + req.body.country + '</p>' +
  '<p><strong>Phone: </strong>' + req.body.phone + '</p>' +
  '<p><strong>Email: </strong>' + req.body.email + '</p>';

  var mailOptions = {
    to: 'eddy.nistru@gmail.com',                 // your email here
    subject: 'ORDER',
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
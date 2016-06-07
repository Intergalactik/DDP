/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Product = require('../api/product/product.model');
var Catalog = require('../api/catalog/catalog.model');
var mainCatalog, shirt, jacket, tshirt;

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });

  Catalog
  .find({})
  .remove()
  .then(function() {
    return Catalog.create({ name: 'All'});
  })
  .then(function(catalog) {
    mainCatalog = catalog;
    return mainCatalog.addChild({name: 'Shirt'});
  })
  .then(function(category) {
    shirt = category._id;
    return mainCatalog.addChild({name: 'Jacket'});
  })
  .then(function(category) {
    jacket = category._id;
    return mainCatalog.addChild({name: 'T-shirt'})
  })
  .then(function(category) {
    tshirt = category._id;
    return Product.find({}).remove({});
  })
  .then(function() {
    return Product.create({
      title: 'Product 1',
      imageUrl: '/assets/uploads/image_1.jpg',
      price: 0.25,
      size: 'L',
      stock: 1,
      categories: [jacket],
      description: 'Description of Product #1'
    }, {
      title: 'Product 2',
      imageUrl: '/assets/uploads/image_2.jpg',
      price: 0.30,
      size: 'M',
      stock: 1,
      categories: [shirt],
      description: 'Description of Product #2'
    }, {
      title: 'Product 3',
      imageUrl: '/assets/uploads/image_3.jpg',
      price: 0.22,
      size: 'S',
      stock: 1,
      categories: [tshirt],
      description: 'Description of product #3'
    })
  })
  .then(function() {
    console.log('Finished populating Products with Categories');
  })
  .then(null, function(err) {
    console.error('Error populating Products & Categories: ', err);
  });
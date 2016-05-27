'use strict';

var ProductPage = function() {
  this.title = element(by.binding('product.title'));
  this.description = element(by.binding('product.description'));
  this.price = element(by.binding('product.price'));
  this.size = element(by.binding('product.size'));

  this.inputTitle = element(by.model('product.title'));
  this.inputDescription = element(by.model('product.description'));
  this.inputPrice = element(by.model('product.price'));
  this.inputSize = element(by.model('product.size'));

  this.saveButton = element(by.buttonText('Save'));
  this.detailsLink = element(by.linkText('Details'));

  this.products = by.repeater('product in products');
};

module.exports = new ProductPage();

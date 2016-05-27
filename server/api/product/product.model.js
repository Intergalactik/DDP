'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true, min: 0},
  description: String,
  size: {type: String, required: true},
  stock: {type: Number, default: 1},
  imageBin: {data: Buffer, contentType: String},
  imageUrl: String,
  createdAt: {type: Date, default: Date.now },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Catalog', index: true }]
}).index({
	'title': 'text',
	'description': 'text'
});

module.exports = mongoose.model('Product', ProductSchema);

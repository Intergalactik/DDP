var Product = require('./product.model.js');

describe('Product', function() {
  beforeEach(function(done){
    Product.remove(done); // remove all data
  });

  it('should not create without title', function(done) {
    Product.create({price: 123.45, size: 'S'}, function(err){
      err.should.not.be.empty;
      done();
    });
  });

  it('should remove trailing spaces from title', function(done){
    Product.create({title: 'no space', price: 123, size: 'S'},
      productShouldHave('title', 'no space', done));
  });

  it('should default stock to 1', function(done){
    Product.create({title: 'title', price: 123, size: 'S'},
      productShouldHave('stock', 1, done));
  });

  it('should not create without price', function(done) {
    Product.create({title: 'no price', size: 'S'}, function(err){
      err.should.not.be.empty;
      done();
    });
  });

  it('should not create without size', function(done) {
    Product.create({title: 'no size', price: 123}, function(err) {
      err.should.not.be.empty;
      done();
    });
  });

  it('should not allow negative price', function(done) {
    Product.create({title: 'title', price: -123}, function(err){
      err.should.not.be.empty;
      done();
    });
  });

  it('should save a description', function(done){
    Product.create({title: 'title', price: 123, size: 'S', description: 'le description'},
      productShouldHave('description', 'le description', done));
  });
});

function productShouldHave(name, value, done){
  return function(err){
    if(err) done(err);

    Product.findOne({}, function(err, product){
      if(err) done(err);
      product.should.have.property(name, value);
      done();
    });
  }
}

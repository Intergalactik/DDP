'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).to.eventually.equal('Dama De Pica');
    expect(page.imgEl.getAttribute('src')).to.eventually.match(/logo.png$/);
  });
});
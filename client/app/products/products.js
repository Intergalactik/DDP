'use strict';

angular.module('meanshopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/templates/product-list.html',
        controller: 'ProductsCtrl'
      })

      .state('newProduct', {
		url: '/products/new',
		templateUrl: 'app/products/templates/product-new.html',
		controller: 'ProductNewCtrl',
		authenticate: true
	  })

	  .state('viewProduct', {
		url: '/products/:id',
		templateUrl: 'app/products/templates/product-view.html',
		controller: 'ProductViewCtrl'
	  })
	
	  .state('editProduct', {
		url: '/products/:id/edit',
		templateUrl: 'app/products/templates/product-edit.html',
		controller: 'ProductEditCtrl',
		authenticate: true
	 })

	  .state('productCatalog', {
	  	url: '/products/:slug/catalog',
	  	templateUrl: 'app/products/templates/product-list.html',
	  	controller: 'ProductCatalogCtrl'
	  })

	  .state('checkout', {
	  	url: '/checkout',
	  	templateUrl: 'app/products/templates/product-checkout.html',
	  	controller: 'ProductCheckoutCtrl'
	  })
	  .state('confirmation', {
	  	url: '/checkout/confirm',
	  	templateUrl: 'app/products/templates/product-checkout-confirmation.html',
	  	controller: 'ProductCheckoutCtrl'
	  });
  });

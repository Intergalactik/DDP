'use strict';

angular.module('meanshopApp')
  .controller('AdminCtrl', function($scope, $http, Auth, User, Products, $state) {
    
    $scope.products = Products.query();

    $scope.showProduct = function(product){
      $state.go('viewProduct', {id: product._id});
    };

    $scope.editProduct = function(product){
      $state.go('editProduct', {id: product._id});
    };

    $scope.deleteProduct = function(product){
      Products.remove({ id: product._id });
      var index = $scope.products.indexOf(product);
      $scope.products.splice(index, 1);
    };
  
  });

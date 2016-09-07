'use strict';

angular.module('meanshopApp')

  .controller('MainCtrl', function($scope, $http, socket, Products) {
    $scope.products = Products.query();
  })

  .controller('ContactCtrl', function($scope, $http, $state) {
  	 // $scope.postData = {};

    $scope.postMail = function (contact) {
      // Check form validation
      if ($scope.contactForm.$invalid === true) {
        return;
      } 

      
      // wrap all your input values in $scope.postData
      // $scope.postData = angular.copy(contact);
      else {
        $http.post('/api/contact', angular.copy(contact))
        .success(function(/*data*/) {
          // Show success message
    $state.go('contactsubmit');
          $scope.contact = {};
          
        })
        .error(function(/*data*/) {
          // Show error message
        });
      }

      

    };

    
  });




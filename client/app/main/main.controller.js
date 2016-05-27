'use strict';

angular.module('meanshopApp')
  .controller('MainCtrl', function($scope, $http, socket, Products) {
    $scope.products = Products.query();
  })

  .controller('ContactCtrl', function($scope, $http, $state) {
  	 $scope.postData = {};

    $scope.postMail = function (contact) {
      // Check form validation
      if ($scope.contactForm.$invalid === true) {
        return
      }
      // wrap all your input values in $scope.postData
      $scope.postData = angular.copy(contact);

      $http.post('/api/contact', $scope.postData)
        .success(function(data) {
          // Show success message
        })
        .then($state.go('contact'))
        .error(function(data) {
          // Show error message
        });
    };

    
  });

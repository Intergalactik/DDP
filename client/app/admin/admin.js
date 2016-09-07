'use strict';

angular.module('meanshopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        authenticate: true,
        controller: 'AdminCtrl'
      });
  });

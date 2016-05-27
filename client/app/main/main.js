'use strict';

angular.module('meanshopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('contact', {
      	url: '/contact',
      	templateUrl: 'app/main/contact.html',
      	controller: 'ContactCtrl'
      })
      .state('about', {
      	url: '/about',
      	templateUrl: 'app/main/about.html'
      });
  });

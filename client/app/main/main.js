'use strict';

angular.module('axismakerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('new', {
        url: '/new',
        templateUrl: 'app/main/new/new.html',
        controller: 'NewCtrl'
      })
      .state('edit', {
        url: '/edit',
        templateUrl: 'app/main/edit/edit.html',
        controller: 'EditCtrl'
      })
      .state('edit_item', {
        url: '/edit/:item',
        templateUrl: 'app/main/edit/edit.html',
        controller: 'EditCtrl'
      });
  });

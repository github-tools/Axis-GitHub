'use strict';

angular.module('axismakerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('preview', {
        url: '/preview',
        templateUrl: 'app/preview/preview/preview.html',
        controller: 'PreviewCtrl'
      });
  });
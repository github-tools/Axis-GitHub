'use strict';

angular.module('axismakerApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $window) {
    $scope.menu = [
    // {
    //   'title': 'About',
    //   'link': '/',
    //   'icon': 'fa-info-circle'
    // },
    {
      'title': 'New',
      'link': '/new',
      'icon': 'fa-file-image-o'
    },
    {
      'title': 'Edit',
      'link': '/edit',
      'icon': 'fa-folder-open-o'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });

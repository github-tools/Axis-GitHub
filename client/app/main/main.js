'use strict';

angular.module('axismakerApp')
  .controller('MainCtrl', function(Auth, $scope, userData, $location){
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.repoSet = false;

    // Check if repo is set:
    if (userData && userData.repoURI.indexOf('git://') > -1) {
      $scope.repoSet = true;
    } else {
      $location.path('/settings');
    }
  })
  .config(['$tooltipProvider', function($tooltipProvider){
    $tooltipProvider.setTriggers({
        'invalidFilename': 'validFilename'
    });
}]);

'use strict';

angular.module('axismakerApp')
  .directive('validateFilename', function ($q, $anchorScroll, $location) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.validateFilename = function(modelValue) {
          var deferred = $q.defer();
          if (scope.github && modelValue.length) {
            var repo = scope.github.getRepo(scope.repoName[1], scope.repoName[2]);
            var url = modelValue + '/index.html';
            repo.getSha(scope.branch, url, function(err, sha){
              console.clear(); // Otherwise it throws a bunch of 404s. Woo.
              if (sha) {
                scope.$emit('invalidFilename'); // show popover
                scope.popoverText = 'Please choose a unique name for the chart.';
                angular.element('body').scrollTop(0);
                deferred.reject();
              } else {
                scope.$emit('validFilename'); // hide popover if visible
                deferred.resolve();
              }
            });
          } else {
            deferred.reject();
          }

          return deferred.promise;
        };
      }
    };
  });

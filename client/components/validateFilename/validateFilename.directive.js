'use strict';

angular.module('axismakerApp')
  .directive('validateFilename', function ($q) {
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
              if (sha) {
                deferred.reject();
              } else {
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

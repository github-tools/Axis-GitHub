'use strict';

angular.module('axismakerApp')
  .controller('NewCtrl', function ($scope, Auth, $compile, $http, $window) {
    $scope.branch = 'gh-pages'; // change to gh-pages in prod
    $scope.token = Auth.getCurrentUser().githubToken;
    $scope.github = new Github({token: $scope.token, auth: 'oauth'});
    $scope.currentRepoURI = Auth.getCurrentUser().repoURI;
    $scope.repoName = $scope.currentRepoURI.match(/git:\/\/github\.com\/([^/]+)\/(.+?)\.git$/);
    $scope.filename = '';
    $scope.isInvalid = function(){
      return $scope.filename.$invalid;
    };
    var repo = $scope.github.getRepo($scope.repoName[1], $scope.repoName[2]);
    var createNew = function(config) {
      if ($scope.filename !== '') {
        $http.get('/app/preview/preview.html').success(function(template){
          repo.write($scope.branch, './' + $scope.filename + '/index.html', template, 'initial', function(err, res, xmlhttprequest){
            console.dir([err, res, xmlhttprequest]);
            var url = 'https://' + $scope.repoName[1] + '.github.io/' + $scope.repoName[2] + '/' + res.content.path;
          });
          repo.write($scope.branch, './' + $scope.filename + '/axis.json', config.config, 'initial', function(err, res, xmlhttprequest){
            // url = 'https://' + repoName[1] + '.github.io/' + repoName[2] + '/' + res.content.path;
            console.dir([err, res, xmlhttprequest]);
            console.log('finished');
          });
        });
      }
    };

    angular.element($window).bind('message', function(e) {
      var config = angular.fromJson(e.originalEvent.data);
      createNew(config);
    });

    // $scope.$root.$on('$messageIncoming', function (event, data){
    //   console.log('yay');
    //   var config = angular.fromJson(data);
    //   createNew(config);
    // });
  });

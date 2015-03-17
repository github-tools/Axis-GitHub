'use strict';

angular.module('axismakerApp')
  .controller('NewCtrl', function ($scope, Auth, $compile, $http, $window, $modal) {
    $window.axisConfig = undefined; // clear global config from previous edits
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
          repo.write($scope.branch, $scope.filename + '/index.html', template, 'initial -- ' + $scope.filename, function(err, res, xmlhttprequest){
            console.dir([err, res, xmlhttprequest]);
            //var url = 'https://' + $scope.repoName[1] + '.github.io/' + $scope.repoName[2] + '/' + res.content.path; // GH-pages 5 minute delay sucks.
            var url = 'https://rawgit.com/' + $scope.repoName[1] + '/' + $scope.repoName[2] + '/index.html';
            var cdnUrl = 'https://cdn.rawgit.com/' + $scope.repoName[1] + '/' + $scope.repoName[2] + '/index.html';

            // Second write has to be after the first completes.
            repo.write($scope.branch, $scope.filename + '/axis.json', config.config, 'initial config -- ' + $scope.filename, function(err, res, xmlhttprequest){
              console.dir([err, res, xmlhttprequest]);
              $modal.open({
                templateUrl: 'components/modal/modal.html',
                controller: function($scope, $sce){
                  $scope.modal = {};
                  $scope.modal.title = url;
                  $scope.modal.html = $sce.trustAsHtml('<iframe src="' + url + '" width="100%" height="100%"></iframe><br><a href="' + cdnUrl + '" target="_blank">Open in new window <i class="fa fa-search-plus"></i></a>');
                }
              });
            });
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

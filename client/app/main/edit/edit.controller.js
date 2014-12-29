'use strict';

angular.module('axismakerApp')
  .controller('EditCtrl', function ($scope, $location, Auth, $stateParams) {
    var branch = 'master'; // change to gh-pages in prod
    $scope.itemName = typeof $stateParams.item !== 'undefined' ? $stateParams.item : undefined;
    var token = Auth.getCurrentUser().githubToken;
    var github = new Github({token: token, auth: 'oauth'});
    var currentRepoURI = Auth.getCurrentUser().repoURI;
    var repoName = currentRepoURI.match(/git:\/\/github\.com\/([^/]+)\/(.+?)\.git$/);
    var repo = github.getRepo(repoName[1], repoName[2]);

    if (!$scope.itemName) {
      repo.getTree(branch, function(err, tree){
        $scope.directories = [];
        angular.forEach(tree, function(item){
          if (item.type === 'tree') {
            $scope.directories.push(item);
          }
        });
        $scope.$apply();
      });
    } else {
      repo.read(branch, $scope.itemName + '/axisjs.json', function(err, res){
        if (err) {
          alert('This isn\'t an Axis chart!');
          $location.path = '/edit';
        } else {
          console.dir(res);
          // do axis-y stuff hurr
        }
      });
    }

    $scope.editChart = function(path) {
      $location.path('/edit/' + path);
    };
  });

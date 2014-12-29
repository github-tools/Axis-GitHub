'use strict';

angular.module('axismakerApp')
  .controller('NewCtrl', function ($scope, Auth) {
    $scope.createNew = function(config) {
      var branch = 'master'; // change to gh-pages in prod
      var token = Auth.getCurrentUser().githubToken;
      var github = new Github({token: token, auth: 'oauth'});
      var currentRepoURI = Auth.getCurrentUser().repoURI;
      var repoName = currentRepoURI.match(/git:\/\/github\.com\/([^/]+)\/(.+?)\.git$/);
      var repo = github.getRepo(repoName[1], repoName[2]);
      repo.write(branch, './test.txt', 'testing commit', 'test', function(a,b,c){
        console.dir([a,b,c]);
      });
    };
  });

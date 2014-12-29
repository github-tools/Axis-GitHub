'use strict';

angular.module('axismakerApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $q, DTOptionsBuilder, DTColumnBuilder) {
    var token = Auth.getCurrentUser().githubToken;
    $scope.currentRepoURI = Auth.getCurrentUser().repoURI;
    var githubUsername = Auth.getCurrentUser().github.login;
    var github = new Github({token: token, auth: 'oauth'});
    var githubUser = github.getUser();
    githubUser.repos(function(err, repoList){
      var writableRepos = [];
      if (repoList) {
        angular.forEach(repoList, function(repo, i){
          if (!repo.fork && repo.permissions.push && repo.permissions.pull) {
            writableRepos.push(repo);
          }
        });
        if ($scope.currentRepoURI) {
          var current = writableRepos.filter(function(v){
            return v.git_url === $scope.currentRepoURI;
          });
          var remainder = writableRepos.filter(function(v){
            return v.git_url !== $scope.currentRepoURI;
          });
          if (current.length) {
            remainder.unshift(current[0]);
          }
          writableRepos = remainder;
        }
        $scope.writableRepos = writableRepos;
        $scope.$apply();
      }
    });
    $scope.showNewRepo = false;


    // TODO Implement DataTables

    // $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
    //   return $scope.writableRepos;
    // });
    //
    // $scope.dtColumns = [
    //   DTColumnBuilder.newColumn
    // ];

    // var repos = github.userRepos(function(v){
    //   console.log(v);
    // });
    // console.dir($github.getUser().then(function(v){console.dir(v.repos());}));

    $scope.createNewRepo = function(repo) {
      var newRepo = repo.length ? repo : typeof $scope.newRepoName !== 'undefined' ? $scope.newRepoName : undefined;
      if (newRepo) {
        githubUser.createRepo({'name': newRepo}, function(err, res){
          if (err) {
            $scope.newRepoMessages = err;
          } else {
            var repoURI = res.git_url;
            $scope.changeRepo(repoURI);
          }
        });
      }
    };

    $scope.changeRepo = function(repoURI) {
      if (repoURI) {
        Auth.changeRepo(repoURI)
        .then(function(){
          $scope.message = 'Repo successfully changed.';
          $scope.currentRepoURI = repoURI;
        })
        .catch(function(){
          $scope.errors.other = '???'; // TODO roffle.
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name grenadeNgRootApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the grenadeNgRootApp
 */
angular.module('grenadeNgRootApp')
  .controller('MainCtrl', function ($scope, $window, GistApi, BugzillaApi) {
    $scope.go = function(url){
      $window.location.href = url;
    };
    $scope.things = [];
    GistApi.query({username: 'grenade'}, function(gists){
      for (var i in gists) {
        if (!!(gists[i].description)) {
          $scope.things.push({
            date: gists[i].created_at,
            summary: gists[i].description,
            comments: gists[i].comments,
            files: gists[i].files,
            url: gists[i].html_url,
            icon: 'images/github-icon.png'
          });
          $scope.things.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? -1 : a<b ? 1 : 0;
          });
        }
      }
    });
    BugzillaApi.query({assigned_to: 'rthijssen'}, function(data){
      for (var i in data.bugs) {
        $scope.things.push({
          date: data.bugs[i].last_change_time,
          summary: data.bugs[i].summary,
          //comments: data.bugs[i].comments,
          url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=' + data.bugs[i].id,
          icon: 'images/BugZilla_Mascot.png'
        });
        $scope.things.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      }
      $scope.data = data;
    });
  });

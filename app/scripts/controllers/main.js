'use strict';

/**
 * @ngdoc function
 * @name grenadeNgRootApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the grenadeNgRootApp
 */
angular.module('grenadeNgRootApp')
  .controller('MainCtrl', function ($scope, GistApi) {
    $scope.things = [];
    var gistFilter = function (gist) {
      return !!(gist.description);
    };
    GistApi.query({username: 'grenade'}, function(gists){
      $scope.things = gists.filter(gistFilter);
    });
  });

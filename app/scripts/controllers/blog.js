'use strict';

/**
 * @ngdoc function
 * @name grenadeNgRootApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the grenadeNgRootApp
 */
angular.module('grenadeNgRootApp')
  .controller('BlogCtrl', function ($scope, GistApi) {
    $scope.gists = GistApi.query({username: 'grenade'});

    // filters gists by ensuring description and at least one markdown file exist
    $scope.gistFilter = function (gist) {
      if (gist.description) {
        //for (var filename in gist.files) {
        //  if (gist.files.hasOwnProperty(filename) && gist.files[filename].language === 'Markdown') {
            return true;
        //  }
        //}
      }
      return false;
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name grenadeNgRootApp.MozHgApi
 * @description
 * # MozHgApi
 * Factory in the grenadeNgRootApp.
 */
angular.module('grenadeNgRootApp')
  .factory('MozHgApi', function ($resource) {
    var url = 'https://hg.mozilla.org/:repo/json-pushes?full=1&user=:email';
    return $resource(
      url,
      {
        repo: '@_repo',
        email: '@_email'
      }
    );
  })
  .factory('MozHgOrgApi', function ($resource) {
    var url = 'https://hg.mozilla.org/:org/:repo/json-pushes?full=1&user=:email';
    return $resource(
      url,
      {
        repo: '@_org',
        repo: '@_repo',
        email: '@_email'
      }
    );
  });
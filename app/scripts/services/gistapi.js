'use strict';

/**
 * @ngdoc service
 * @name grenadeNgRootApp.GistApi
 * @description
 * # GistApi
 * Factory in the grenadeNgRootApp.
 */
angular.module('grenadeNgRootApp')
  .factory('GistApi', function ($resource) {
    var gistsUrl = 'https://api.github.com/users/:username/gists';
    return $resource(
      gistsUrl,
      {
        username: '@_username',
        id: '@_id'
      },
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        },
        get: {
          url: gistsUrl + '/:id'
        },
        query: {
          isArray: true
        }
      }
    );
  });


angular.module('grenadeNgRootApp')
  .factory('GitHubEventsApi', function ($resource) {
    var eventsUrl = 'https://api.github.com/users/:username/events';
    return $resource(
      eventsUrl,
      {
        username: '@_username',
        id: '@_id'
      },
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        },
        get: {
          url: eventsUrl + '/:id'
        },
        query: {
          isArray: true
        }
      }
    );
  });

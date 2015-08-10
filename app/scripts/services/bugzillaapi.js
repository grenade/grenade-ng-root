'use strict';

/**
 * @ngdoc service
 * @name grenadeNgRootApp.BugzillaApi
 * @description
 * # BugzillaApi
 * Service in the grenadeNgRootApp.
 */
angular.module('grenadeNgRootApp')
  .service('BugzillaApi', function ($resource) {
    return $resource('https://bugzilla.mozilla.org/rest/bug/:id', { id: '@_id' }, {
      query: {
        isArray: false
      }
    });
    /*
    var bugsUrl = 'https://bugzilla.mozilla.org/rest/bug';
    return $resource(
      bugsUrl,
      {
        email: '@_email',
        id: '@_id'
      },
      {
        get: {
          url: bugsUrl + '/:id'
        },
        query: {
          url: bugsUrl + '?assigned_to=:email',
          isArray: false
        }
      }
    );
    */
  });

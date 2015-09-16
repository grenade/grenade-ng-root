'use strict';

/**
 * @ngdoc service
 * @name grenadeNgRootApp.SoApi
 * @description
 * # SoApi
 * Factory in the grenadeNgRootApp.
 */
angular.module('grenadeNgRootApp')
  .factory('SoUserApi', function ($resource) {
    var apiUrl = 'https://api.stackexchange.com/2.2/users/:userid/:interaction?order=desc&sort=activity&site=stackoverflow';
    return $resource(
      apiUrl,
      {
        userid: '@_userid',
        interaction: '@_interaction'
      },
      {
        query: {
          isArray: false
        }
      }
    );
  });

angular.module('grenadeNgRootApp')
  .factory('SoQuestionApi', function ($resource) {
    var apiUrl = 'https://api.stackexchange.com/2.2/questions/:questionid?order=desc&sort=activity&site=stackoverflow';
    return $resource(
      apiUrl,
      {
        questionid: '@_questionid'
      },
      {
        query: {
          isArray: false
        }
      }
    );
  });

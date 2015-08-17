'use strict';

/**
 * @ngdoc function
 * @name grenadeNgRootApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the grenadeNgRootApp
 */
angular.module('grenadeNgRootApp')
  .controller('MainCtrl', function ($scope, $window, $location, GistApi, GitHubEventsApi, BugzillaApi) {
    var imageBase = 'https://raw.githubusercontent.com/grenade/grenade-ng-root/master/app/images/';
    if ($location.host() === 'localhost') {
      imageBase = 'images/';
    }
    $scope.go = function(url) {
      $window.location.href = url;
    };
    var needleInHaystack = function (needle, haystack) {
        for (var straw in haystack) {
          if (haystack.hasOwnProperty(straw) && haystack[straw].language === needle) {
            return true;
          }
        }
        return false;
    }
    var getIcon = function (files) {
      if (needleInHaystack('PowerShell', files)) {
        return imageBase + 'icon-powershell.png';
      }
      if (needleInHaystack('Python', files)) {
        return imageBase + 'icon-python.png';
      }
      if (needleInHaystack('Shell', files)) {
        return imageBase + 'icon-bash.png';
      }
      if (needleInHaystack('Markdown', files)) {
        return imageBase + 'icon-markdown.png';
      }
      return imageBase + 'icon-gist.png';
    };
    $scope.things = [];
    GistApi.query({username: 'grenade'}, function (gists) {
      for (var i in gists) {
        if (!!(gists[i].description)) {
          $scope.things.push({
            date: gists[i].created_at,
            summary: gists[i].description,
            comments: gists[i].comments,
            files: gists[i].files,
            url: gists[i].html_url,
            icon: getIcon(gists[i].files)
          });
          $scope.things.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? -1 : a<b ? 1 : 0;
          });
        }
      }
    });
    GitHubEventsApi.query({username: 'grenade'}, function (events) {
      for (var i in events) {
        switch (events[i].type) {
          case 'PullRequestEvent':
            $scope.things.push({
              date: events[i].created_at,
              summary: 'Pull Request ' + events[i].payload.number + ' to: ' + events[i].repo.name,
              description: events[i].payload.pull_request.body,
              url: events[i].payload.pull_request.html_url,
              icon: imageBase + 'icon-pull-request.png'
            });
            break;
          case 'CreateEvent':
            $scope.things.push({
              date: events[i].created_at,
              summary: 'Branched: ' + events[i].repo.name + '/' + events[i].payload.ref,
              url: 'https://github.com/' + events[i].repo.name + '/tree/' + events[i].payload.ref,
              icon: imageBase + 'icon-branch.png'
            });
            break;
          case 'DeleteEvent':
            $scope.things.push({
              date: events[i].created_at,
              summary: 'Deleted: ' + events[i].repo.name + '/' + events[i].payload.ref,
              url: 'https://github.com/' + events[i].repo.name + '/tree/' + events[i].payload.ref,
              icon: imageBase + 'icon-delete.png'
            });
            break;
          case 'PushEvent':
            $scope.things.push({
              date: events[i].created_at,
              summary: 'Pushed to: ' + events[i].repo.name + '/' + events[i].payload.ref,
              commits: events[i].payload.commits,
              url: 'https://github.com/' + events[i].repo.name + '/commit/' + events[i].payload.commits[0].sha,
              icon: imageBase + 'icon-commit.png'
            });
            break;
          case 'ForkEvent':
            $scope.things.push({
              date: events[i].created_at,
              summary: 'Forked: ' + events[i].repo.name + ', to: ' + events[i].payload.forkee.full_name,
              url: 'https://github.com/' + events[i].payload.forkee.full_name,
              icon: imageBase + 'icon-fork.png'
            });
            break;
          default:
        }
        $scope.things.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      }
      $scope.ghdata = events;
    });
    BugzillaApi.query({assigned_to: 'rthijssen'}, function (data) {
      for (var i in data.bugs) {
        $scope.things.push({
          date: data.bugs[i].last_change_time,
          summary: data.bugs[i].summary,
          //comments: data.bugs[i].comments,
          url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=' + data.bugs[i].id,
          icon: imageBase + 'icon-bugzilla.png'
        });
        $scope.things.sort(function (a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      }
      $scope.bzdata = data;
    });
  });

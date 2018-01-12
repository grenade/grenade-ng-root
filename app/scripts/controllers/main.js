'use strict';

/**
 * @ngdoc function
 * @name grenadeNgRootApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the grenadeNgRootApp
 */
angular.module('grenadeNgRootApp')
  .controller('MainCtrl', function ($scope, $window, $location, GistApi, GitHubEventsApi, BugzillaApi, SoUserApi, SoQuestionApi, MozHgApi, MozHgOrgApi, RbMozHgApi) {
    $scope.showThing = function(summary) {
      [
        'yoga',
        'steel',
        'bansko',
        'borderless',
        'crypto'
      ].every(function(v){
        return (summary.indexOf(v) < 0);
      });
    };
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
    BugzillaApi.query({assigned_to: 'rthijssen'}, function (data) {
      for (var i in data.bugs) {
        if ($scope.things.filter(function(e) { return e.summary === data.bugs[i].summary}).length < 1) {
          $scope.things.push({
            date: data.bugs[i].last_change_time,
            summary: data.bugs[i].summary,
            //comments: data.bugs[i].comments,
            url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=' + data.bugs[i].id,
            icon: imageBase + 'icon-bugzilla.png'
          });
        }
      }
      $scope.things.sort(function (a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      });
      $scope.bzdata = data;
    });
    BugzillaApi.query({reporter: 'rthijssen'}, function (data) {
      for (var i in data.bugs) {
        if ($scope.things.filter(function(e) { return e.summary === data.bugs[i].summary}).length < 1) {
          $scope.things.push({
            date: data.bugs[i].last_change_time,
            summary: data.bugs[i].summary,
            //comments: data.bugs[i].comments,
            url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=' + data.bugs[i].id,
            icon: imageBase + 'icon-bugzilla.png'
          });
        }
      }
      $scope.things.sort(function (a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      });
      $scope.bzdata = data;
    });
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
        }
      }
      $scope.things.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      });
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
              url: 'https://github.com/' + events[i].repo.name + '/commit/' + events[i].payload.commits[0].sha.substring(0, 7),
              icon: imageBase + 'icon-push-github.png'
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
      }
      $scope.things.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      });
      $scope.ghdata = events;
    });
    SoUserApi.query({userid: '68115', interaction: 'questions'}, function (data) {
      for (var i in data.items) {
        var dt = new Date(0);
        if (data.items[i].last_edit_date) {
          dt.setUTCSeconds(data.items[i].last_edit_date);
        } else {
          dt.setUTCSeconds(data.items[i].creation_date);
        }
        $scope.things.push({
          date: dt.toISOString(),
          summary: data.items[i].title,
          url: data.items[i].link,
          icon: imageBase + 'icon-so.png',
          tags: data.items[i].tags
        });
      }
      $scope.things.sort(function (a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      });
    });
    /*
    SoUserApi.query({userid: '68115', interaction: 'answers'}, function (data) {
      var tracker = {};
      for (var i in data.items) {
        var qid = data.items[i].question_id;
        tracker[qid].answerId = data.items[i].answer_id;
        if (data.items[i].last_edit_date) {
          tracker[qid].utcSeconds = data.items[i].last_edit_date;
        } else {
          tracker[qid].utcSeconds = data.items[i].creation_date;
        }
        SoQuestionApi.query({questionid: qid}, function (qdata) {
          for (var qi in qdata.items) {
            var dt = new Date(0);
            dt.setUTCSeconds(tracker[qdata.items[qi].question_id].utcSeconds);
            $scope.things.push({
              date: dt.toISOString(),
              summary: qdata.items[qi].title,
              url: 'http://stackoverflow.com/questions/' + qdata.items[qi].question_id + '/' + tracker[qdata.items[qi].question_id].answerId,
              icon: imageBase + 'icon-so.png',
              tags: qdata.items[qi].tags
            });
            $scope.things.sort(function (a, b) {
              a = new Date(a.date);
              b = new Date(b.date);
              return a>b ? -1 : a<b ? 1 : 0;
            });
          }
        });
      }
    });
    */
    [
      {org: 'build', repo: 'buildbot'},
      {org: 'build', repo: 'buildbot-configs'},
      {org: 'build', repo: 'puppet'},
      {org: 'build', repo: 'slave_health'},
      {org: 'build', repo: 'tools'},
      {org: 'integration', repo: 'mozilla-inbound'}
    ].map(function(mozhg){
      MozHgOrgApi.get({org: mozhg.org, repo: mozhg.repo, email: 'rthijssen@mozilla.com'}, function (data) {
        for (var i in data) {
          if (data.hasOwnProperty(i) && i.length <= 6) {
            var dt = new Date(0);
            dt.setUTCSeconds(data[i].date);
            $scope.things.push({
              date: dt.toISOString(),
              summary: 'Pushed to: hg.m.o/' + mozhg.org + '/' + mozhg.repo + ' (' + data[i].changesets.map(function(changeset) { return changeset.branch; }).join(', ') + ')',
              changesets: data[i].changesets,
              url: 'https://hg.mozilla.org/' + mozhg.org + '/' + mozhg.repo + '/pushloghtml?changeset=' + data[i].changesets[0].node.substring(0, 12),
              icon: imageBase + 'icon-push-mozilla.png'
            });
          }
        }
        $scope.things.sort(function (a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });
    [
      'try',
      'mozilla-central'
    ].map(function(mozrepo){
      MozHgApi.get({ repo: mozrepo, email: 'rthijssen@mozilla.com'}, function (data) {
        for (var i in data) {
          if (data.hasOwnProperty(i) && i.length <= 6) {
            var dt = new Date(0);
            dt.setUTCSeconds(data[i].date);
            $scope.things.push({
              date: dt.toISOString(),
              summary: 'Pushed to: hg.m.o/' + mozrepo + ' (' + data[i].changesets.map(function(changeset) { return changeset.branch; }).join(', ') + ')',
              changesets: data[i].changesets,
              url: 'https://hg.mozilla.org/' + mozrepo + '/pushloghtml?changeset=' + data[i].changesets[0].node.substring(0, 12),
              icon: imageBase + 'icon-push-mozilla.png'
            });
          }
        }
        $scope.things.sort(function (a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });
    [
      'gecko'
    ].map(function(mozrepo){
      RbMozHgApi.get({ repo: mozrepo, email: 'rthijssen@mozilla.com'}, function (data) {
        for (var i in data) {
          if (data.hasOwnProperty(i) && i.length <= 6) {
            var dt = new Date(0);
            dt.setUTCSeconds(data[i].date);
            $scope.things.push({
              date: dt.toISOString(),
              summary: 'Pushed to: rb-hg.m.o/' + mozrepo + ' (' + data[i].changesets.map(function(changeset) { return changeset.branch; }).join(', ') + ')',
              changesets: data[i].changesets,
              url: 'https://reviewboard-hg.mozilla.org/' + mozrepo + '/pushloghtml?changeset=' + data[i].changesets[0].node.substring(0, 12),
              icon: imageBase + 'icon-push-review-mozilla.png'
            });
          }
        }
        $scope.things.sort(function (a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });
  });

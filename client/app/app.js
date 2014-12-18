'use strict';

angular.module('mixularApp', [
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/start');

    $locationProvider.html5Mode(true);
  })

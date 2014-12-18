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

  .run(function ($rootScope, formModel) {

    formModel.addSection('guestBook', {
      firstName: 'Bob',
      homeWorld: '',
      favouriteThing: 'nothing',
      requirements: 'no'
    });



  });

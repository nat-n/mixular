'use strict';

angular.module('mixularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  })


  .run(function (formModel) {

    formModel.addSection('guestBook', {
      firstName: 'Bob',
      homeWorld: ''
    })

  });


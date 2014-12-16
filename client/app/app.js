'use strict';

angular.module('mixularApp', [
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/start');

    $locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, formModel, optionLists, actions) {

    formModel.addSection('guestBook', {
      firstName: 'Bob',
      homeWorld: '',
      favouriteThing: 'nothing',
      requirements: 'no'
    });

    formModel.addSection('opinions', {
      'best-planet-select': ''
    });

    // initialise a named list of options
    optionLists.register('favouriteThings', [
      {value: 'nothing', label: 'Nothing'},
      {value: 'thing1', label: 'Ice Cream'},
      {value: 'thing2', label: 'Dogs'},
      {value: 'thing3', label: 'Saturdays'},
      {value: 'thing4', label: 'Sunshine'}
    ]);


    // update the list a little while later
    setTimeout(function () {
      optionLists.update('favouriteThings', function(){
        return [
          {value:'nothing', label:'I don\'t like things'},
          {value:'something', label:'Anything really'}
        ];
      });
      $rootScope.$digest();
    }, 2000);


    actions.sayHi = function(name) {
      alert('Hi ' +  name + '!');
    };

  });

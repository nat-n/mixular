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
      'best-planet-select': '',
      listSwitch: 'long',
      favouriteThing: '',
    });

    // initialise a named list of options
    var favList = {
      long: [
        {value: '', label: '--- Please Select ---'},
        {value: 'thing1', label: 'Ice Cream'},
        {value: 'thing2', label: 'Dogs'},
        {value: 'thing3', label: 'Saturdays'},
        {value: 'thing4', label: 'Sunshine'},
        {value: 'nothing', label: 'Nothing'}
      ],
      short: [
        {value: '', label: '--- Please Select ---'},
        {value: 'thing', label: 'Anything really...'},
        {value: 'nothing', label: 'I don\'t like things.' },
      ]
    };

    optionLists.register('favouriteThings', favList.long);

    window.formModel = formModel
    // update the list a little while later
    $rootScope.$watch(
      function () { return formModel.opinions.listSwitch; },
      function (listSwitch) {
        optionLists.update('favouriteThings', function(){
          return favList[listSwitch];
        });
      }
    );


    actions.sayHi = function(name) {
      alert('Hi ' +  name + '!');
    };

  });

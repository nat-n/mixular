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

  .run(function (formModel, optionLists) {

    formModel.addSection('guestBook', {
      firstName: 'Bob',
      homeWorld: '',
      favouriteThing: 'nothing',
      requirements: 'no'
    })

    // initialise a named list of options
    optionLists.register('favouriteThings', [
      {value: 'nothing', label: 'Nothing'},
      {value: 'thing1', label: 'Ice Cream'},
      {value: 'thing2', label: 'Dogs'},
      {value: 'thing3', label: 'Saturdays'},
      {value: 'thing4', label: 'Sunshine'}
    ]);


    // update the list a little while later
    setTimeout(function(){
      optionLists.update('favouriteThings', function(){
        return [
          {value:'nothing', label:'I don\'t like things'},
          {value:'something', label:'Anything really'}
        ]
      });
      $rootScope.$digest();
    },2000)

  });


'use strict';

angular.module('mixularApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })


  .run(function (formModel, optionLists, actions, $rootScope) {

    formModel.addSection('guestBook', {
      firstName: 'Bob',
      homeWorld: '',
      favouriteThing: 'nothing',
      requirements: 'no'
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

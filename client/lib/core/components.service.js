
angular.module('mixularApp')

  .service('coreComponents', function(){
    'use strict'
    var components = [];

    return function(new_component) {
      var conponents_array = [];
      if (new_component) {
        components.push(new_component);
      }
      for (var i = components.length - 1; i >= 0; i--) {
        conponents_array.push('?^' + components[i]);
      };
      return conponents_array;
    };
  });

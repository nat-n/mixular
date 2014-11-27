
angular.module('mixularApp')

  .service('coreComponents', function(){
    'use strict';
    var components = [];

    return function(newComponent) {
      var conponentsArr = [];
      if (newComponent) {
        components.push(newComponent);
      }
      for (var i = components.length - 1; i >= 0; i--) {
        conponentsArr.push('?^' + components[i]);
      }
      return conponentsArr;
    };
  });

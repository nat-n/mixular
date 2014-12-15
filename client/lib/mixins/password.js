
angular.module('mixularApp')

  .directive('password', function(compileMixer, Components) {
    'use strict';

    compileMixer.register(
      'password',
      {priority: 145},
      function(elem, attrs, targets) {
        targets.input.setAttribute('type', 'password');
      }
    );

    return {
      restrict: 'A',
      priority: 145,
      require: Components.optionalParents()
    };
  });

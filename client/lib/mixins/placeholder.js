
angular.module('mixularApp')

  .directive('placeholder', function($templateCache, subTemplates, coreComponents) {
    'use strict';

    subTemplates.register(
      'placeholder',
      {priority: 8},
      function(elem, attrs, targets) {
        targets.input.setAttribute('placeholder', '{{mx.placeholder}}')
      }
    );

    return {
      restrict: 'A',
      priority: 150,
      require: coreComponents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }
        ctrl.placeholder = attrs.placeholder;
      }
    };
  });

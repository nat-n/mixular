
angular.module('mixularApp')

  .directive('placeholder', function(subTemplates, Components) {
    'use strict';

    subTemplates.register(
      'placeholder',
      {priority: 145},
      function(elem, attrs, targets) {
        targets.input.setAttribute('placeholder', '{{mx.placeholder}}');
      }
    );

    return {
      restrict: 'A',
      priority: 145,
      require: Components.optionalParents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }
        ctrl.placeholder = attrs.placeholder;
      }
    };
  });

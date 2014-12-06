
angular.module('mixularApp')

  .directive('maxLength', function(subTemplates, coreComponents) {
    'use strict';

    subTemplates.register(
      'maxLength',
      {priority: 145},
      function(elem, attrs, targets) {
        targets.input.setAttribute('maxlength', '{{mx.maxLength}}');
      }
    );

    return {
      restrict: 'A',
      priority: 145,
      require: coreComponents.optionalParents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }
        ctrl.maxLength = attrs.maxLength;
      }
    };
  });


angular.module('mixularApp')

  .directive('onchange', function(subTemplates,
                                  coreComponents,
                                  actions,
                                  $parse,
                                  $log) {
    'use strict';

    subTemplates.register(
      'onchange',
      {priority: 115},
      function(elem, attrs, targets) {
        targets.field.setAttribute('ng-change', 'mx.onchange()');
      }
    );

    return {
      restrict: 'A',
      priority: 145,
      require: coreComponents.optionalParents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }

        if (!ctrl.hasOwnProperty('modelCtrl')) {
          $log.warn('Cannot initialise onchange;' +
                    ' modelCtrl not present on component controller');
          return;
        }

        var parser = $parse(attrs.onchange);
        var context = angular.extend(Object.create(actions), {mx: ctrl});

        ctrl.onchange = function(){ parser(context); };
      }
    };
  });


angular.module('mixularApp')

  .directive('mxChange', function(compileMixer,
                                  Components,
                                  actions,
                                  $parse,
                                  $log) {
    'use strict';

    compileMixer.register(
      'mxChange',
      {priority: 115},
      function(elem, attrs, targets) {
        targets.field.setAttribute('ng-change', 'mx.mxChange()');
      }
    );

    return {
      restrict: 'A',
      priority: 145,
      require: Components.optionalParents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl = _.find(ctrls);
        if (!ctrl) { return; }

        if (!ctrl.hasOwnProperty('modelCtrl')) {
          $log.warn('Cannot initialise mxChange;' +
                    ' modelCtrl not present on component controller');
          return;
        }

        var parser = $parse(attrs.mxChange);
        var context = angular.extend(Object.create(actions), {mx: ctrl});

        ctrl.mxChange = function(){ parser(context); };
      }
    };
  });

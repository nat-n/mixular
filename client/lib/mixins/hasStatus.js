
angular.module('mixularApp')

  .directive('hasStatus', function($templateCache,
                                    $parse,
                                    subTemplates,
                                    Components) {
    'use strict';

    subTemplates.register(
      'hasStatus',
      {priority: 140},
      function(elem, attrs, targets) {
        targets.mainWrapper.setAttribute('ng-class', 'mx.statusClass');
      }
    );

    return {
      restrict: 'A',
      priority: 100,
      require: Components.optionalParents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }
        ctrl.label = attrs.label;

        var parser = $parse(attrs.hasStatus);

        scope.$watch(
          function(){ return _.findKey(parser(ctrl)); },
          function(result){ ctrl.statusClass = result; }
        );

      }
    };
  });

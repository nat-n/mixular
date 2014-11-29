
angular.module('mixularApp')

  .directive('mxModel', function($parse,
                                 $log,
                                 subTemplates,
                                 coreComponents,
                                 formModel,
                                 $rootScope) {
    'use strict';

    window.$rootScope = $rootScope;


    subTemplates.register(
      'mxModel',
      {priority: 120},
      function(elem, attrs, targets) {
        if (targets.field) {
          targets.field.setAttribute('ng-model', 'mx.model[mx.key]');
        }
      }
    );

    return {
      restrict: 'A',
      priority: 120,
      require: coreComponents.optionalParents(),
      link: {
        pre: function(scope, elem, attrs, ctrls) {
          var ctrl;
          if (!(ctrl = _.find(ctrls))) {
            console.warn('No controller found for mxModel: ' +
                         (attrs.name || ''));
            return;
          }
          ctrl.model = $parse(attrs.mxModel)(formModel);
          ctrl.key = attrs.name;
          ctrl.value = function () { return ctrl.model[ctrl.key]; };
        }
      }
    };
  });

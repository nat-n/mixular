
angular.module('mixularApp')

  .directive('mxModel', function($parse,
                                 subTemplates,
                                 coreComponents,
                                 formModel,
                                 $rootScope) {
    'use strict';

    subTemplates.register(
      'mxModel',
      {priority: 120},
      function(elem, attrs, targets) {
        if (targets.field) {
          targets.field.setAttribute('ng-model', 'mx.model[mx.key]');
          targets.field.setAttribute('mx-model-helper', '');
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
  })


  .directive('mxModelHelper', function (coreComponents) {
    return {
      restrict: 'A',
      priority: 115,
      require: coreComponents.optionalParents('ngModel'),
      link: {
        pre: function(scope, elem, attrs, ctrls) {
          var ctrl, ngModelCtrl = ctrls[ctrls.length-1];
          if (!(ctrl = _.find(ctrls) || ctrl === ngModelCtrl)) {
            console.warn('No controller found for mxModelHelper: ' +
                         (attrs.name || ''));
            return;
          }
          ctrl.modelCtrl = ngModelCtrl;
        }
      }
    };
  })


  .directive('mxModelOptions', function (coreComponents, subTemplates) {
    'use strict';

    subTemplates.register(
      'mxModelOptions',
      {priority: 120},
      function(elem, attrs, targets) {
        if (targets.field) {
          targets.field.setAttribute('ng-model-options', 'mx.modelOptions');
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
            console.warn('No controller found for mxModelOptions: ' +
                         (attrs.name || ''));
            return;
          }
          ctrl.modelOptions = scope.$eval(attrs.mxModelOptions);
        }
      }
    };
  });

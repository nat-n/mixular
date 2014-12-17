'use strict';

angular.module('mixularApp')

  .directive('mxModel', function($parse, compileMixer, Components, formModel) {

    compileMixer.register(
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
      require: Components.optionalParents(),
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


  .directive('mxModelHelper', function (Components) {
    return {
      restrict: 'A',
      priority: 115,
      require: Components.optionalParents('ngModel'),
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


  .directive('mxModelOptions', function (Components, compileMixer) {

    compileMixer.register(
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
      require: Components.optionalParents(),
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

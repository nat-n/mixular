
angular.module('mixularApp')

  .config(function (validationTypesProvider) {
    validationTypesProvider.register(0, 'required');
  })

  .directive('mxRequired', function(coreComponents, $log) {
    'use strict';

    return {
      restrict: 'A',
      priority: 110,
      require: coreComponents.optionalParents(),
      link: mxRequiredLink
    };

    function mxRequiredLink (scope, elem, attrs, ctrls) {
      var ctrl, requiredExpr, required;
      if (!(ctrl = _.find(ctrls))) { return; }

      if (!ctrl.hasOwnProperty('modelCtrl')) {
        $log.warn('Cannot initialise validator;' +
                  ' modelCtrl not present on component controller');
        return;
      }

      requiredExpr = 'true';
      required = true;

      function updateRequiredValidity () {
        var valid = Boolean(
          !required ||
          (
            ctrl.modelCtrl.$viewValue &&
            String(ctrl.modelCtrl.$viewValue).trim().length
          )
        );
        ctrl.modelCtrl.$setValidity('required', valid);
      }

      // if whether this field is required is dependent on a condition
      if (attrs.rfRequired) {
        attrs.$observe('rfRequired', function (expr) { requiredExpr = expr; });
      }

      // for some unknown reason simply watching the expression doesnt work
      scope.$watch(requiredExpr, function (newRequiredSetting) {
        required = newRequiredSetting;
        updateRequiredValidity();
      });

      scope.$watch(
        function () { return ctrl.modelCtrl.$viewValue; },
        updateRequiredValidity
      );
    }

  });

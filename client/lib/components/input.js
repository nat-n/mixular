
angular.module('mixularApp')

  .directive('mxInput', function (coreComponents, subTemplates) {
    'use strict';

    coreComponents('mxInput');

    function targets (elem) {
      var input = elem.children('input')[0];
      return {
        main: input,
        input: input
      };
    }

    function controller ($scope, $attrs, $element, $injector) {
      var ctrl = {};

      ctrl.include = function(ctrlMixin) {
        $injector.annotate(ctrlMixin);
        $injector.invoke(ctrlMixin, ctrl, {
          '$scope': $scope,
          '$element': $element,
          '$attrs': $attrs
        });
      };

      ctrl.model = {};
      ctrl.key = undefined;
      ctrl.value = function () { return ctrl.model[ctrl.key]; };

      ctrl.id = $attrs.name;

      $scope.mx = ctrl;
      return ctrl;
    }

    function compile(elem, attrs) {
      subTemplates.apply(elem, attrs, targets(elem));
    }

    return {
      restrict: 'E',
      template: '<input id="{{mx.id}}-mx-input">',
      scope: true,
      controller: controller,
      compile: compile
    };
  });

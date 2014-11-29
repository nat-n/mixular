
angular.module('mixularApp')

  .directive('mxSelect', function (coreComponents, subTemplates) {
    'use strict';

    // register this as a core component
    coreComponents('mxSelect');

    function makeTargets (elem) {
      var select = elem.children('select')[0];
      return subTemplates.createTargets({
        main: select,
        field: select,
        select: select
      });
    }

    // Create a wrapper $transclude function that only can only be called once
    var transcludeWrapper = function (ctrl, $transclude) {
      var called = false;
      return function(scope, cloneAttachFn, futureParentElement){
        if (called) {
          console.warn('$transclude function for ' + ctrl.id +
                       ' called multiple times. Aborting.');
          return;
        }
        called = true;
        return $transclude(scope, cloneAttachFn, futureParentElement);
      };
    };

    function mxSelectController ($scope, $attrs, $element, $injector, $transclude) {
      var ctrl = this;

      ctrl.include = function(ctrlMixin) {
        $injector.annotate(ctrlMixin);
        $injector.invoke(ctrlMixin, ctrl, {
          '$scope': $scope,
          '$element': $element,
          '$attrs': $attrs,
          '$transclude': transcludeWrapper(ctrl, $transclude),
          'targets': ctrl.targets
        });
      };

      ctrl.id = $attrs.name + '-mx-select';
      ctrl.options = [];

      return ctrl;
    }

    function mxSelectCompile(elem, attrs) {
      var targets = makeTargets(elem);
      subTemplates.apply(elem, attrs, targets);
      return {
        pre: function (scope, elem, attrs, ctrl) {
          ctrl.targets = targets;
        }
      };
    }

    var template = (
      '<select id="{{mx.id}}"' +
              'ng-options="o.value as o.label group by o.group for o in mx.options"' +
      '></select>');

    return {
      restrict: 'E',
      template: template,
      transclude: true,
      scope: {},
      require: 'mxSelect',
      controller: mxSelectController,
      controllerAs: 'mx',
      compile: mxSelectCompile
    };
  });

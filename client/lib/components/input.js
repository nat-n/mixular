'use strict';

angular.module('mixularApp')

  .config(function (ComponentsProvider) {
    // Register this as a component so that other directives can require it
    ComponentsProvider.register('mxInput');
  })

  .directive('mxInput', function (compileMixer) {
    function makeTargets (elem) {
      var input = elem.children('input')[0];
      return compileMixer.createTargets({
        main: input,
        field: input,
        input: input
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

    function mxInputController ($scope, $attrs, $element, $injector, $transclude) {
      var ctrl = this;

      var WrappedTranscluder = transcludeWrapper(ctrl, $transclude);
      ctrl.include = function(ctrlMixin) {
        $injector.annotate(ctrlMixin);
        $injector.invoke(ctrlMixin, ctrl, {
          '$scope': $scope,
          '$element': $element,
          '$attrs': $attrs,
          '$transclude': WrappedTranscluder,
          'targets': ctrl.targets
        });
      };

      ctrl.id = $attrs.name + '-mx-input';

      return ctrl;
    }

    function mxInputCompile(elem, attrs) {
      var targets = makeTargets(elem);
      compileMixer.apply(elem, attrs, targets);
      return {
        pre: function (scope, elem, attrs, ctrl) {
          ctrl.targets = targets;
        }
      };
    }

    return {
      restrict: 'E',
      template: '<input id="{{mx.id}}">',
      transclude: true,
      scope: {},
      require: 'mxInput',
      controller: mxInputController,
      controllerAs: 'mx',
      compile: mxInputCompile
    };
  });

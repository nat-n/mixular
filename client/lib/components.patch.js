// Create a wrapper $transclude function that only can only be called once
function transcludeWrapper (ctrl, $transclude) {
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
}

function mxComponentControllerWrapper (ctrlMixin) {
  return function mxComponentController ($scope,
                                         $attrs,
                                         $element,
                                         $injector,
                                         $transclude) {
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

    if (ctrlMixin) { ctrl.include(ctrlMixin); }

    return ctrl;
  }
}

function mxComponentCompileWrapper(module, params) {
  return function mxComponentCompile(elem, attrs) {
    // manually manage injection
    var $injector = angular.element('[ng-app="' + module.name + '"]').injector();
    var subTemplates;
    $injector.invoke(['subTemplates', function(st){ subTemplates = st; }]);

    var link = {},
        targets = subTemplates.createTargets(params.targets(elem));

    subTemplates.apply(elem, attrs, targets);

    var preLinkWrapper = function (preLink) {
      return function(scope, elem, attrs, ctrl) {
        ctrl.targets = targets;
        if (preLink) { preLink(scope, elem, attrs, ctrl); }
      }
    }

    if (params.hasOwnProperty('link')) {
      if (angular.isFunction(params.link)) {
        link.post = params.link;
      }
      if (params.link.hasOwnProperty('post')) {
        link.post = params.link.post;
      }
      link.pre = preLinkWrapper(params.link.pre);
    }

    return link;
  };
}



function defineAngularComponent(name, params) {
  var module = this;

  this.config(function (coreComponentsProvider) {
    // Register this as a core component so that other directives can require it
    if (params.core || !params.hasOwnProperty('core')) {
      coreComponentsProvider.register(name);
    }
  });

  this.directive(name, function (coreComponents) {
    'use strict';

    var directiveDef = {
      restrict: 'E',
      transclude: true,
      scope: {},
      require: name,
      controller: mxComponentControllerWrapper(params.controller),
      controllerAs: 'mx',
      compile: mxComponentCompileWrapper(module, params)
    };

    if (params.hasOwnProperty('restrict')) {
      directiveDef.restrict = params.restrict;
    }

    if (params.hasOwnProperty('transclude')) {
      directiveDef.transclude = params.transclude;
    }

    if (params.hasOwnProperty('scope')) {
      directiveDef.scope = params.scope;
    }

    if (params.hasOwnProperty('template')) {
      directiveDef.template = params.template;
    }

    if (params.hasOwnProperty('templateUrl')) {
      directiveDef.templateUrl = params.templateUrl;
    }

    return directiveDef;
  });

}

angular.module('mixularApp').component = angular.bind(
  angular.module('mixularApp'),
  defineAngularComponent
);

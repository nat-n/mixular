
angular.module('mixularApp')

  .directive('mxOptionsList', function($templateCache,
                                         $parse,
                                         subTemplates,
                                         coreComponents,
                                         optionLists) {
    'use strict';

    function mxOptionsListLink(scope, elem, attrs, ctrls) {
      var ctrl;
      if (!(ctrl = _.find(ctrls))) { return; }

      optionLists.watch(
        attrs.mxOptionsList,
        function (newOptions) { ctrl.options = newOptions;},
        function () { return !scope.$$destroyed; }
      );
    }

    return {
      restrict: 'A',
      priority: 140,
      require: coreComponents.optionalParents(),
      link: mxOptionsListLink
    };
  });

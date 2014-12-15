
angular.module('mixularApp')

  .directive('mxOptionsList', function($templateCache,
                                       $parse,
                                       compileMixer,
                                       Components,
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
      require: Components.optionalParents(),
      link: mxOptionsListLink
    };
  });

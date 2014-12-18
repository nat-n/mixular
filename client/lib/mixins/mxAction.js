'use strict';

angular.module('mixularApp')

  .directive('mxAction', function(actions, Components, $parse) {

    return {
      restrict: 'A',
      require: Components.optionalParents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl = _.find(ctrls);

        var parser = $parse(attrs.mxAction);
        var context = angular.extend(Object.create(actions), {mx: ctrl});

        function doAction (){ parser(context); };

        elem.on('click', doAction);
      }
    };
  });

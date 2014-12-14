
angular.module('mixularApp')

  .directive('statusIcon', function($templateCache,
                                    $parse,
                                    subTemplates,
                                    Components) {
    'use strict';

    $templateCache.put('status-icon.html',
      '<span class="glyphicon form-control-feedback"' +
           ' ng-class="mx.glyphiconClass"' +
           ' aria-hidden="true">{{glyphiconClass}}</span>'
    );

    subTemplates.register(
      'statusIcon',
      {priority: 140},
      function(elem, attrs, targets) {
        targets.$replace('after0', 'status-icon.html');
        targets.mainWrapper.classList.add('has-feedback');
      }
    );

    return {
      restrict: 'A',
      priority: 100,
      require: Components.optionalParents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }
        ctrl.label = attrs.label;

        var parser = $parse(attrs.statusIcon);

        scope.$watch(
          function(){ return _.findKey(parser(ctrl)); },
          function(result){ ctrl.glyphiconClass = result; }
        );

      }
    };
  });

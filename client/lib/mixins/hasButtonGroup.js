
angular.module('mixularApp')

  .directive('hasButtonGroup', function($templateCache,
                                        subTemplates,
                                        coreComponents) {
    'use strict';

    $templateCache.put('has-button-group.html',
      '<div class="input-group">' +
        '<tp-main></tp-main>' +
        '<tp-button-group></tp-button-group>' +
      '</div>'
    );

    subTemplates.register(
      'hasButtonGroup',
      {priority: 130},
      function(elem, attrs, targets) {
        targets.$wrap('main', 'has-button-group.html');
        targets.buttonGroup = elem.find('tp-button-group')[0];
      }
    );

    return {
      restrict: 'A',
      priority: 130,
      require: coreComponents.optionalParents(),
      scope: false,
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }

        ctrl.include(function ($transclude, targets) {
          $transclude(scope, function (contents) {
            // Extract first button group from contents
            var btnGrp = _.find(contents, function (node) {
              return (node.nodeName === 'DIV' &&
                      node.classList.contains('input-group-btn'));
            });
            if (btnGrp) {
              targets.$transclude('buttonGroup', btnGrp);
            }
          });
        });
      }
    };
  });

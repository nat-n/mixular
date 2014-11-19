// required target input


angular.module('mixularApp')

  .directive('verticalField', function(subTemplates, $templateCache) {
    'use strict';

    $templateCache.put('vertical-field.html',
      '<div class="form-group">' +
        '<div>' +
          '<label for="{{mx.id}}-input"' +
                ' class="control-label"' +
                ' ng-bind="mx.label"></label>' +
        '</div>' +
        '<div>' +
          '<tp-before></tp-before>' +
          '<tp-main></tp-main>' +
          '<tp-after></tp-after>' +
        '</div>' +
      '</div>'
    );

    subTemplates.register(
      'verticalField',
      {priority: 10},
      function(elem, attrs, targets) {
        // SHOULD: check and update targets
        var template = angular.element($templateCache.get('vertical-field.html'));
        var tpMain = template.find('tp-main')[0];
        elem[0].replaceChild(template[0], targets.main);
        tpMain.parentElement.replaceChild(targets.main, tpMain);
        targets.input.classList.add('form-control');
      }
    );

    return {
      restrict: 'A',
      priority: 150,
      link: function(scope, elem, attrs) {
        scope.mx || (scope.mx = {});
        scope.mx.label = attrs.label;
      }
    };
  });

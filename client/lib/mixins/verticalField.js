// required target input


angular.module('mixularApp')

  .directive('verticalField', function($templateCache, subTemplates, coreComponents) {
    'use strict';

    $templateCache.put('vertical-field.html',
      '<div class="form-group vertical-field">' +
        '<div ng-if="mx.label">' +
          '<label for="{{mx.id}}-input"' +
                ' class="control-label"' +
                ' ng-bind="mx.label"></label>' +
        '</div>' +
        '<div class="main-wrapper">' +
          '<tp-before></tp-before>' +
          '<tp-main></tp-main>' +
          '<tp-after></tp-after>' +
        '</div>' +
      '</div>'
    );

    subTemplates.register(
      'verticalField',
      {priority: 150},
      function(elem, attrs, targets) {
        targets.$wrap('main', 'vertical-field.html');
        targets.field.classList.add('form-control');
        targets.before = elem.find('tp-before')[0];
        targets.after = elem.find('tp-after')[0];
      }
    );

    return {
      restrict: 'A',
      priority: 150,
      require: coreComponents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }
        ctrl.label = attrs.label;
      }
    };
  });

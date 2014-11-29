// TODO: use attr value to config grid layout classes (e.g. narow wide, 3,4,4 etc)

angular.module('mixularApp')

  .directive('horizontalField', function($templateCache, subTemplates, coreComponents) {
    'use strict';

    $templateCache.put('horizontal-field.html',
      '<div class="form-group row horizontal-field">' +
        '<div class="col-md-2" ng-if="mx.label">' +
          '<label for="{{mx.id}}"' +
                ' class="control-label"' +
                ' ng-bind="mx.label"></label>' +
        '</div>' +
        '<div class="col-md-6 main-wrapper">' +
          '<tp-before></tp-before>' +
          '<tp-main></tp-main>' +
          '<tp-after></tp-after>' +
        '</div>' +
      '</div>'
    );

    subTemplates.register(
      'horizontalField',
      {priority: 150},
      function(elem, attrs, targets) {
        targets.$wrap('main', 'horizontal-field.html');
        targets.field.classList.add('form-control');
        elem.addClass('form-horizontal');
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

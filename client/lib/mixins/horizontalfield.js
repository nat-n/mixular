
angular.module('mixularApp')

  .directive('horizontalField', function($templateCache,
                                         compileMixer,
                                         Components) {
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
          '<tp-after-0></tp-after-0>' +
          '<tp-after-1></tp-after-1>' +
          '<tp-after-2></tp-after-2>' +
        '</div>' +
      '</div>'
    );

    compileMixer.register(
      'horizontalField',
      {priority: 150},
      function(elem, attrs, targets) {
        targets.$wrap('main', 'horizontal-field.html');
        targets.field.classList.add('form-control');
        elem.addClass('form-horizontal');
        targets.mainWrapper = elem.find('main-wrapper')[0];
        targets.before = elem.find('tp-before')[0];
        targets.after0 = elem.find('tp-after-0')[0];
        targets.after1 = elem.find('tp-after-1')[0];
        targets.after2 = elem.find('tp-after-2')[0];
      }
    );

    return {
      restrict: 'A',
      priority: 150,
      require: Components.optionalParents(),
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }
        ctrl.label = attrs.label;
      }
    };
  });

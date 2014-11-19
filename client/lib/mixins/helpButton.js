
angular.module('mixularApp')

  .directive('helpButton', function(subTemplates, $templateCache) {
    'use strict';

    $templateCache.put('help-button.html',
      '<div class="help-button"' +
           ' id="{{mx.id}}-help">' +
          '<input type="button"' +
                ' value="?"' +
                ' id="{{mx.id}}-help-button"' +
                ' title="help"' +
                ' ng-click="mx.help.show=!mx.help.show"' +
                ' class="help-button">' +
        '<div class="ng-hide"' +
             ' ng-show="mx.help.show"' +
             ' id="{{mx.id}}-help-text">' +
          '<span ng-bind-html="mx.help.msg"></span>' +
        '</div>' +
      '</div>'
    );

    subTemplates.register(
      'helpButton',
      {priority: 8},
      function(elem, attrs, targets) {
        var template = angular.element($templateCache.get('help-button.html'));
        var tpAfter = elem.find('tp-after')[0];
        tpAfter.parentElement.replaceChild(template[0], tpAfter);
        elem.addClass('has-help-button');
      }
    );

    return {
      link: function(scope, element, attrs) {
        scope.mx.help = {
          show: false,
          msg: attrs.helpButton
        };
      }
    };
  });

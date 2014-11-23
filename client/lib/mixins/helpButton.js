
angular.module('mixularApp')

  .directive('helpButton', function(subTemplates, $templateCache, coreComponents) {
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
        targets.$replace('after', 'help-button.html')
        elem.addClass('has-help-button');
      }
    );

    return {
      require: coreComponents(),
      link: function(scope, element, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }
        ctrl.help = {
          show: false,
          msg: attrs.helpButton
        };
      }
    };
  });

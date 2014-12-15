
angular.module('mixularApp')

  .directive('helpButton', function(compileMixer,
                                    $templateCache,
                                    Components) {
    'use strict';

    $templateCache.put('help-button.html',
      '<div class="help-button"' +
           ' id="{{mx.id}}-help">' +
          '<input type="button"' +
                ' value="?"' +
                ' id="{{mx.id}}-help-button"' +
                ' title="help"' +
                ' ng-click="mx.help.show=!mx.help.show"' +
                ' ng-blur="mx.help.show=false"' +
                ' class="help-button">' +
        '<div class="ng-hide"' +
             ' ng-show="mx.help.show"' +
             ' id="{{mx.id}}-help-text">' +
          '<span ng-bind-html="mx.help.msg"></span>' +
        '</div>' +
      '</div>'
    );

    compileMixer.register(
      'helpButton',
      {priority: 140},
      function helpButtonCompile(elem, attrs, targets) {
        targets.$replace('after1', 'help-button.html');
        elem.addClass('has-help-button');
      }
    );

    return {
      restrict: 'A',
      priority: 140,
      require: Components.optionalParents(),
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

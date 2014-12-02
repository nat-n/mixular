
angular.module('mixularApp')

  .directive('validMessage', function(subTemplates,
                                      $templateCache,
                                      coreComponents,
                                      validationTypes) {
    'use strict';

    $templateCache.put('validation-message.html',
      '<div class="validation-message"' +
          ' ng-show="mx.validationMsgs.activeMessage && mx.modelCtrl.$touched"' +
          ' ng-bind="mx.validationMsgs.activeMessage"' +
          ' id="{{mx.id}}-validation-message">' +
      '</div>'
    );

    subTemplates.register(
      'helpButton',
      {priority: 140},
      function(elem, attrs, targets) {
        targets.$replace('after1', 'validation-message.html');
      }
    );

    return {
      restrict: 'A',
      priority: 115,
      require: coreComponents.optionalParents(),
      link: function(scope, element, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }

        ctrl.validationMsgs = {
          inlineMessages: {},
          summaryMessages: {},
          activeMessage: null
        };

        scope.$watchCollection(
          function () { return ctrl.modelCtrl.$error; },
          function (errors) {
            var firstError = validationTypes.firstError(errors);
            if (firstError) {
              ctrl.validationMsgs.activeMessage = ctrl.validationMsgs
                .inlineMessages[firstError];
            } else {
              ctrl.validationMsgs.activeMessage = '';
            }
          }
        );

        // Read messages from other attributes
        _.each(attrs, function(msg, attr) {
          var errorName,
              errorMsgMatch = attr.match(/mx([\w]*)Msg/);
          if (errorMsgMatch && errorMsgMatch[1]) {
            errorName = errorMsgMatch[1].split('');
            errorName[0] = errorName[0].toLowerCase();
            errorName = errorName.join('');
            ctrl.validationMsgs.inlineMessages[errorName] = msg;
          }
        });
      }
    };
  });

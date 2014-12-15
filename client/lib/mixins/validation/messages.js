
angular.module('mixularApp')

  .directive('validMessage', function(compileMixer,
                                      $templateCache,
                                      Components,
                                      validationTypes) {
    'use strict';

    $templateCache.put('validation-message.html',
      '<div class="validation-message"' +
          ' ng-show="mx.validationMsgs.activeMessage && mx.modelCtrl.$touched"' +
          ' ng-bind="mx.validationMsgs.activeMessage"' +
          ' id="{{mx.id}}-validation-message">' +
      '</div>'
    );

    compileMixer.register(
      'validMessage',
      {priority: 140},
      function(elem, attrs, targets) {
        targets.$replace('after2', 'validation-message.html');
      }
    );

    return {
      restrict: 'A',
      priority: 115,
      require: Components.optionalParents(),
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
              errorMsgMatch = attr.match(/mx([\w]*)Msg/),
              errorSumMatch = attr.match(/mx([\w]*)Err/);
          if (errorMsgMatch && errorMsgMatch[1]) {
            errorName = errorMsgMatch[1].split('');
            errorName[0] = errorName[0].toLowerCase();
            errorName = errorName.join('');
            ctrl.validationMsgs.inlineMessages[errorName] = msg;
          } else if (errorSumMatch && errorSumMatch[1]) {
            errorName = errorSumMatch[1].split('');
            errorName[0] = errorName[0].toLowerCase();
            errorName = errorName.join('');
            ctrl.validationMsgs.summaryMessages[errorName] = msg;
          }
        });

        ctrl.validate = function () {
          // compile list of error messages for the current valid state
          if (ctrl.modelCtrl.$valid) {
            return null;
          } else {
            _.reduce(
              _.keys(ctrl.modelCtrl.$errors),
              function (err, summary) {
                if (ctrl.modelCtrl.$errors[err] &&
                    ctrl.validationMsgs.summaryMessages[err]) {
                  summary.push(ctrl.validationMsgs.summaryMessages[err]);
                }
              }, []
            );
          }
        };

      }
    };
  });

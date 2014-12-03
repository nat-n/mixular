
angular.module('mixularApp')

  .directive('verticalRadioSet', function($templateCache, subTemplates, coreComponents) {
    'use strict';

    $templateCache.put('vertical-radioset.html',
      '<div class="form-group row vertical-radioset">' +
        '<div class="main-wrapper">' +
          '<tp-before></tp-before>' +
          '<tp-main></tp-main>' +
          '<tp-after></tp-after>' +
          '<tp-after-1></tp-after-1>' +
        '</div>' +
      '</div>'
    );

    subTemplates.register(
      'verticalRadioSet',
      {priority: 150},
      function(elem, attrs, targets) {
        targets.$wrap('main', 'vertical-radioset.html');
        targets.main.classList.add('col-md-6');
        targets.before = elem.find('tp-before')[0];
        targets.after = elem.find('tp-after')[0];
        targets.after1 = elem.find('tp-after-1')[0];
        if (attrs.verticalRadioSet === 'inline') {
          elem.find('.radio')
            .removeClass('radio')
            .addClass('radio-inline');
        }
      }
    );

    return {
      restrict: 'A',
      priority: 150,
      require: 'mxRadioSet',
      link: function(scope, elem, attrs, ctrls) {
        var ctrl;
        if (!(ctrl = _.find(ctrls))) { return; }

      }
    };
  });

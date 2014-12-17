
angular.module('mixularApp')

  .directive('horizontalRadioSet', function($templateCache,
                                            compileMixer) {
    'use strict';

    $templateCache.put('horizontal-radioset.html',
      '<div class="form-group row horizontal-radioset">' +
        '<div class="main-wrapper">' +
          '<tp-before></tp-before>' +
          '<tp-main></tp-main>' +
          '<tp-after></tp-after>' +
          '<tp-after-1></tp-after-1>' +
        '</div>' +
      '</div>'
    );

    compileMixer.register(
      'horizontalRadioSet',
      {priority: 150},
      function(elem, attrs, targets) {
        targets.$wrap('main', 'horizontal-radioset.html');
        targets.legend.classList.add('col-md-2');
        targets.labelsWrapper.classList.add('col-md-6');
        targets.before = elem.find('tp-before')[0];
        targets.after = elem.find('tp-after')[0];
        targets.after1 = elem.find('tp-after-1')[0];
        if (attrs.horizontalRadioSet === 'inline') {
          targets.labelsWrapper.find('input.radio')
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

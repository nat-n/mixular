'use strict';

angular.module('mixularApp')

  .directive('footerNav', function ($state, sections, $templateCache) {

    $templateCache.put('/components/footer/nav.html',
      '<footer class="footer">' +
        '<div class="container">' +
          '<nav>' +
            '<ul class="pager">' +
              '<li class="pull-left" ng-if="footerNav.previousPage">' +
                '<a ui-sref="{{footerNav.previousPage.stub}}">' +
                  '&larr; {{footerNav.previousPage.title}}' +
                '</a>' +
              '</li>' +
              '<li class="pull-right" ng-if="footerNav.nextPage">' +
                '<a ui-sref="{{footerNav.nextPage.stub}}">' +
                  '{{footerNav.nextPage.title}} &rarr;' +
                '</a>' +
              '</li>' +
            '</ul>' +
          '</nav>' +
        '</div>' +
      '</footer>'
    );

    return {
      restrict: 'E',
      templateUrl: '/components/footer/nav.html',
      scope: {},
      require: 'footerNav',
      controller: function () {
        // cache previous and next section names
        var prev = this.nextPage = this.previousPage = null;
        for (var i = 0; i < sections.order.length; i++) {
          if (sections.order[i] === $state.current.name) {
            this.previousPage = sections.get(prev);
            if (sections.order[i+1]) {
              this.nextPage = sections.get(sections.order[i+1]);
            }
            break;
          }
          prev = sections.order[i];
        }

        return this;
      },
      link: function (scope, elem, attrs, footerNav) {
        scope.footerNav = footerNav;
      }
    };
  });
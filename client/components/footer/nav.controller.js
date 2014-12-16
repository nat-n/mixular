'use strict';

angular.module('mixularApp')

  .directive('footerNav', function ($state, sections) {

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
        };

        return this;
      },
      link: function (scope, elem, attrs, footerNav) {
        scope.footerNav = footerNav;
      }
    };
  });
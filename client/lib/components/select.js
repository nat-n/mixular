
angular.module('mixularApp')

  .component('mxSelect', {
    core: true,
    controller: function() {
      this.options = [];
    },
    link: {
      pre: function (scope, elem, attrs, ctrl) {
        ctrl.label = attrs.label;
      }
    },
    template: (
      '<select id="{{mx.id}}"' +
             ' ng-options="o.value as o.label group by o.group for o in mx.options"' +
      '></select>'
    ),
    targets: function(elem) {
      'use strict';
      var select = elem.children('select')[0];
      return {
        main: select,
        field: select,
        select: select
      };
    }
  });

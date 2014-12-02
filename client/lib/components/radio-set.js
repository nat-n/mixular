
angular.module('mixularApp')

  .component('mxRadioSet', {
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
      '<fieldset>' +
        '<legend ng-show="mx.label" ng-bind="mx.label"></legend>' +
        '<label class="radio" ng-repeat="o in mx.options">' +
          '<input type="radio"' +
                ' ng-model="mx.model[mx.key]"' +
                ' name="{{mx.id}}"' +
                ' id="{{mx.id}}-{{$index}}"' +
                ' ng-value="o.value">' +
          '{{o.label}}' +
        '</label>' +
      '</fieldset>'
    ),
    targets: function(elem) {
      return {
        main: elem.children('fieldset')[0],
        legend: elem.children('legend')[0]
      };
    }
  });

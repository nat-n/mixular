
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
        '<div>' +
          '<label class="radio" ng-repeat="o in mx.options">' +
            '<input type="radio"' +
                  ' ng-model="mx.model[mx.key]"' +
                  ' name="{{mx.id}}"' +
                  ' id="{{mx.id}}-{{$index}}"' +
                  ' ng-value="o.value">' +
            '{{o.label}}' +
          '</label>' +
        '</div>' +
      '</fieldset>'
    ),
    targets: function(elem) {
      var fieldset = elem.children('fieldset')[0];
      return {
        main: fieldset,
        legend: elem.find('legend')[0],
        labelsWrapper: elem.find('fieldset > div')[0]
      };
    }
  });


angular.module('mixularApp')

  .directive('mxOptions', function($templateCache,
                                   $parse,
                                   subTemplates,
                                   coreComponents) {
    'use strict';

    function mxOptionsLink(scope, elem, attrs, ctrls) {
      var ctrl;
      if (!(ctrl = _.find(ctrls))) { return; }

      scope.$watch(attrs.mxOptions, function (opts) {
        var keys = {};

        if (_.isObject(opts) & !_.isArray(opts)) {
          ctrl.options = _.map(opts, function (v, k) {
            return {value: k, label: v};
          });

        } else if (_.isArray(opts)) {
          ctrl.options = _.reduce(opts, function (r, o) {
            var new_opt;
            if (_.isString(o.value) && _.isString(o.label) && !keys[o.value]) {
              new_opt = {
                value: o.value,
                label: o.label
              };
              keys[o.value] = true;
              if (_.isString(o.group)) {
                new_opt.group = o.group;
              }
              r.push(new_opt);
            }
          }, []);
        }

      });
    };

    return {
      restrict: 'A',
      priority: 140,
      require: coreComponents(),
      link: mxOptionsLink
    };
  });

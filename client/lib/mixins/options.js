'use strict';

angular.module('mixularApp')

  .directive('mxOptions', function($templateCache,
                                   $parse,
                                   compileMixer,
                                   Components) {

    function mxOptionsLink(scope, elem, attrs, ctrls) {
      var ctrl = _.find(ctrls);
      if (!ctrl) { return; }

      scope.$watch(attrs.mxOptions, function (opts) {
        var keys = {};

        if (_.isObject(opts) && !_.isArray(opts)) {
          ctrl.options = _.map(opts, function (v, k) {
            return {value: k, label: v};
          });

        } else if (_.isArray(opts)) {
          ctrl.options = _.reduce(opts, function (r, o) {
            var newOpt;
            if (_.isString(o.value) && _.isString(o.label) && !keys[o.value]) {
              newOpt = {
                value: o.value,
                label: o.label
              };
              keys[o.value] = true;
              if (_.isString(o.group)) {
                newOpt.group = o.group;
              }
              r.push(newOpt);
            }
          }, []);
        }

      });
    }

    return {
      restrict: 'A',
      priority: 140,
      require: Components.optionalParents(),
      link: mxOptionsLink
    };

  });


angular.module('mixularApp')

  .service('subTemplates', function () {
    'use strict';

    var templates = {};

    function register(name, params, compile_func) {
      templates[name] = {
        params: params,
        compile: compile_func
      };
    }

    function apply(elem, attrs, target) {
      // Apply compiles any registered functions that match present attributes,
      //  respecting priority ordering.
      var sorted = [], funcs, a, i, j, params;
      for (a in attrs) {
        if (attrs.hasOwnProperty(a) && templates.hasOwnProperty(a)) {
          params = templates[a].params
          sorted[params.priority] = (sorted[params.priority] || []);
          sorted[params.priority].push(templates[a].compile);
        }
      }
      for (i = sorted.length - 1; i >= 0; i -= 1) {
        funcs = sorted[i];
        if (funcs) {
          for (j = funcs.length - 1; j >= 0; j -= 1) {
            funcs[j](elem, attrs, target);
          }
        }
      }
    }

    return {
      register: register,
      apply: apply
    };
  });

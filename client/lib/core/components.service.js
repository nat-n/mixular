
angular.module('mixularApp')

  .provider('Components', function ComponentsProvider() {
    'use strict';
    var components = [];

    this.register = function(newComponent) {
      components.push(newComponent);
    };

    this.$get = function ComponentsFactory() {
      return {
        optionalParents: function() {
          var i, mapped = components.map(function (c) { return '?^' + c; });
          for (i = 0; i < arguments.length; i++) { mapped.push(arguments[i]); }
          return mapped;
        }
      };
    };
  });

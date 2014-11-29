
angular.module('mixularApp')

  .provider('coreComponents', function coreComponentsProvider() {
    'use strict';
    var components = [];

    this.register = function(newComponent) {
      components.push(newComponent);
    };

    this.$get = function coreComponentsFactory() {
      return {
        optionalParents: function() {
          return components.map(function (c) { return '?^' + c; });
        }
      }
    };
  });

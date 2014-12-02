
angular.module('mixularApp')

  .provider('validationTypes', function validationTypesProvider() {
    'use strict';

    var validationTypes = {},
        validationPriorities = [];

    this.register = function(priority, newValidationType) {
      if (validationTypes.hasOwnProperty(priority)) {
        console.error(
          'Attempt to register two valdiations with same priority', priority,
          newValidationType, validationTypes[priority]
        );
        return;
      }
      validationTypes[priority] = newValidationType;
      validationPriorities.push(priority);
      validationPriorities.sort(function(a, b){ return a - b; });
    };

    this.$get = function validationTypesFactory() {
      return {
        firstError: function(errors) {
          var result;
          validationPriorities.forEach(function (p) {
            if (errors[validationTypes[p]]) {
              result = validationTypes[p];
              return;
            }
          });
          return result;
        }
      };
    };
  });

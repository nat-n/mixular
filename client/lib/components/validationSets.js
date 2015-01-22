'use strict';

angular.module('mixularApp')

  .service('validationSets', function validationSets () {

    function ensureValidationSet (setName) {
      if (!validationSets.hasOwnProperty(setName)) {
        validationSets[setName] = {
          validations: [],
          watchers: [],
          errors: []
        };
      }
    }

    function registerValidation (setName, ctrl) {
      ensureValidationSet(setName);
      validationSets[setName].validations.push(ctrl);
    }

    function watchValidationSet (setName, cb, condition, global) {
      ensureValidationSet(setName);
      validationSets[setName].watchers.push({
        callback: cb,
        condition: condition,
        global: global
      });
    }

    function triggerGlobal () {
      _.each(validationSets, function (v, k) { triggerSet(k, true); });
    }

    function triggerSet (setName, global) {
      if (validationSets.hasOwnProperty(setName)) {
        // filter by and condition and trigger validations
        validationSets[setName].errors.length = 0;
        validationSets[setName].validations = _.filter(
          validationSets[setName].validations,
          function (ctrl) {
            var errors;
            if (ctrl.present()) {
              if (errors = ctrl.validate()) {
                validationSets[setName].errors.push(errors);
              }
              return true;
            }
            return false;
          }
        );

        // filter and trigger watchers of validation changes
        validationSets[setName].watchers = _.filter(
          validationSets[setName].watchers,
          function (watcher) {
            if (watcher.condition()) {
              if (!global || watcher.global) {
                watcher.cb(validationSets[setName].errors);
              }
              return true;
            }
            return false;
          }
        );
      }
    }

    var validationSetsService  = {
          registerValidation: registerValidation,
          watch: watchValidationSet,
          triggerGlobal: triggerGlobal,
          triggerSet: triggerSet
        },
        validationSets = {};

    Object.freeze(validationSetsService);
    return validationSetsService;
  });

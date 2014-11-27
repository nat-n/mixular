
angular.module('mixularApp')

  .service('formModel', function () {
    'use strict';

    var sections = [],
        formModel = {};

    function addSection(name, schema) {
      var section;
      sections.push(name);
      section = formModel[name] = {
        $index: Object.keys(sections).length,
        $name: name,
        $schema: {}
      };

      // initialise schema for this section
      (function schemaInitRec(src, dest) {
        _.each(src, function (v, k) {
          if (k[0] !== '$') {
            if (_.isObject(v)) {
              if (_.isArray(v)) {
                if (!dest.hasProperty(k)) { dest[k] = []; }
                angular.copy(v, dest[k]);
              } else {
                if (!dest.hasProperty(k)) { dest[k] = {}; }
                schemaInitRec(src[k], dest[k]);
              }
            }
            dest[k] = v;
          }
        });
      })(schema, section.$schema);

      // initialise form model for this section
      resetSection(name);

      // seal form model to schema
      (function sealRec (object) {
        Object.seal(object);
        _.each(section, function (v, k) {
          if (k[0] !== '$' && _.isObject(v) && !_.isArray(v)) {
            sealRec(v);
          }
        });
      })(section);
    }

    function resetSection (sectionName) {
      angular.copy(formModel[sectionName].$schema, formModel[sectionName]);
    }

    Object.defineProperties(formModel, {
      addSection: {
        value: addSection,
        writable: false,
        enumerable: false,
        configurable: false
      },
      resetSection: {
        value: resetSection,
        writable: false,
        enumerable: false,
        configurable: false
      }
    });

    return formModel;
  });

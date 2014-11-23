
angular.module('mixularApp')

  .service('subTemplates', function ($templateCache, $log) {
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
      //  respecting priority ordering (highest first).
      var a, i, params,
          sorted = []; // a sparse array

      for (a in attrs) {
        if (attrs.hasOwnProperty(a) && templates.hasOwnProperty(a)) {
          params = templates[a].params
          sorted[params.priority] = (sorted[params.priority] || []);
          sorted[params.priority].push(templates[a].compile);
        }
      }
      for (i = sorted.length - 1; i >= 0; i -= 1) {
        if (sorted[i]) {
          _.each(sorted[i], function (func) { func(elem, attrs, target); });
        }
      }
    }

    function targetReplace (target_name, template_name) {
      var target = this[target_name];
      if (!(target && target.hasOwnProperty('ownerDocument'))) {
        // crude test that this isn't a DOM node
        $log.error('No valid target node: ' + target_name);
      }

      var template = angular.element($templateCache.get(template_name))[0];
      if (!template) {
        $log.error('No valid template: ' + template_name);
      }

      target.parentElement.replaceChild(template, target);
      // remove used up target
      delete this[target_name];
    }

    function targetTransclude (target_name, content) {
      var target = this[target_name];
      if (!(target && target.hasOwnProperty('ownerDocument'))) {
        // crude test that this isn't a DOM node
        $log.error('No valid target node: ' + target_name);
      }

      if (!(content && content.hasOwnProperty('ownerDocument'))) {
        // crude test that this isn't a DOM node
        $log.error('Transclusion content not a valid dome node: ' + target_name,
                   content);
      }

      target.parentElement.replaceChild(content, target);
      // remove used up target
      delete this[target_name];
    }

    function targetWrap (target_name, template_name) {
      var target = this[target_name];
      if (!(target && target.hasOwnProperty('ownerDocument'))) {
        // crude test that this isn't a DOM node
        $log.error('No valid target node: ' + target_name);
      }

      var template = angular.element($templateCache.get(template_name));
      if (!template) {
        $log.error('No valid template: ' + template_name);
      }

      var tp = template.find('tp-' + target_name)[0];
      if (!tp) {
        $log.error('No transclusion point for ' + target_name +
                   ' in template: ' + template_name);
      }

      target.parentElement.replaceChild(template[0], target);
      tp.parentElement.replaceChild(target, tp);
    }

    function createTargets (targets) {
      Object.defineProperties(targets, {
        $replace: {
          value: targetReplace,
          writable: false,
          enumerable: false,
          configurable: false
        },
        $wrap: {
          value: targetWrap,
          writable: false,
          enumerable: false,
          configurable: false
        },
        $transclude: {
          value: targetTransclude,
          writable: false,
          enumerable: false,
          configurable: false
        }
      });
      return targets;
    }

    return {
      register: register,
      apply: apply,
      createTargets: createTargets
    };
  });


angular.module('mixularApp')

  .service('compileMixer', function ($templateCache, $log) {
    'use strict';

    var templates = {};

    function register(name, params, compileFunc) {
      templates[name] = {
        params: params,
        compile: compileFunc
      };
      Object.freeze(templates[name]);
    }

    function apply(elem, attrs, target) {
      // Apply compiles any registered functions that match present attributes,
      //  respecting priority ordering (highest first).
      _.keys(attrs)
        .filter(function(a){
          return attrs.hasOwnProperty(a) && templates.hasOwnProperty(a);
        })
        .sort(function(a, b){
          return templates[b].params.priority - templates[a].params.priority;
        })
        .forEach(function(a){
          templates[a].compile(elem, attrs, target);
        });
    }

    function targetReplace (targetName, templateName) {
      var target = this[targetName];
      if (!(target && target.hasOwnProperty('ownerDocument'))) {
        // crude test that this isn't a DOM node
        $log.error('No valid target node: ' + targetName);
      }

      var template = angular.element($templateCache.get(templateName))[0];
      if (!template) {
        $log.error('No valid template: ' + templateName);
      }

      target.parentElement.replaceChild(template, target);
      // remove used up target
      delete this[targetName];
    }

    function targetTransclude (targetName, content) {
      var target = this[targetName];
      if (!(target && target.hasOwnProperty('ownerDocument'))) {
        // crude test that this isn't a DOM node
        $log.error('No valid target node: ' + targetName);
      }

      if (!(content && content.hasOwnProperty('ownerDocument'))) {
        // crude test that this isn't a DOM node
        $log.error('Transclusion content not a valid dome node: ' + targetName,
                   content);
      }

      target.parentElement.replaceChild(content, target);
      // remove used up target
      delete this[targetName];
    }

    function targetWrap (targetName, templateName) {
      var target = this[targetName];
      if (!(target && target.hasOwnProperty('ownerDocument'))) {
        // crude test that this isn't a DOM node
        $log.error('No valid target node: ' + targetName);
      }

      var template = angular.element($templateCache.get(templateName));
      if (!template) {
        $log.error('No valid template: ' + templateName);
      }

      var tp = template.find('tp-' + targetName)[0];
      if (!tp) {
        $log.error('No transclusion point for ' + targetName +
                   ' in template: ' + templateName);
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

'use strict';

angular.module('mixularApp')

  .provider('sections', function sectionsProvider() {
    'use strict';

    var sections = [{
        'title': 'Start',
        'stub': 'start',
      } ,{
        'title': 'Why components?',
            'stub': 'why-components'
      } ,{
        'title': 'Patterns',
        'stub': 'tricks',
        'subsections': [{
            'title': 'Compile mixin',
            'stub': 'template-mixin'
          }, {
            'title': 'Controller mixin',
            'stub': 'controller-mixin'
          }, {
            'title': 'Monkey patch',
            'stub': 'monkey-patch'
        }]
      } ,{
        'title': 'More Examples',
        'stub': 'example-components',
        'subsections': [{
            'title': 'Components',
            'stub': 'components'
          }, {
            'title': 'Layouts',
            'stub': 'layouts'
          }, {
            'title': 'Addons',
            'stub': 'addons'
          }, {
            'title': 'Behavoirs',
            'stub': 'behavoirs'
        }]
      } ,{
        'title': 'Demo',
        'stub': 'working-example'
      } ,{
        'title': 'Conclusion',
        'stub': 'conclusion'
    }];


    sections.order = [];
    sections.forEach(function (section) {
      if (section.subsections) {
        section.subsections.forEach(function (subsection) {
          sections.order.push(subsection.stub)
        });
      } else {
        sections.order.push(section.stub);
      }
    });

    sections.get = function (sectionStub) {
      var result;
      sections.forEach(function (section) {
        if (section.stub === sectionStub) { result = section; }
        if (section.subsections) {
          section.subsections.forEach(function (subsection) {
            if (subsection.stub === sectionStub) {
              result = subsection;
              return;
            }
          });
          if (result) { return result; }
        }
      });
      return result;
    }

    this.sections = sections;

    this.$get = function sectionsFactory() { return sections; };
  })


  .config(function (sectionsProvider, $stateProvider) {
    // define state for every section
    sectionsProvider.sections.forEach(function (section) {
      $stateProvider.state(section.stub, {
        url: '/' + section.stub,
        templateUrl: 'app/sections/' + section.stub + '.html'
      });
      if (section.subsections) {
        section.subsections.forEach(function (subsection) {
          $stateProvider.state(subsection.stub, {
            url: '/' + section.stub + '/' + subsection.stub,
            templateUrl: 'app/sections/' + section.stub +
                         '.' + subsection.stub + '.html'
          });
        });
      }
    });
  })

  .run(function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function () {
      // scroll to top on state change
      window.scrollTo(0, 0);
    });
  })

  .directive('abridged', function () {
    return {
      restrict: 'A',
      transclude: true,
      template: '<div ng-class="{abridged:abridged,unabridged:!abridged}">' +
                  '<div class="abr-ellipsis" ng-click="abridged=false">{{indent}}// ...</div>' +
                  '<div ng-transclude></div>' +
                '</div>',
      scope: true,
      link: function (scope, elem, attrs) {
        var indent_size = parseInt(attrs.abridged)
        scope.indent = ''
        while (indent_size > 0) {
          scope.indent += ' ';
          indent_size--;
        }

        scope.abridged = true;
      }
    };
  });

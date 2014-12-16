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
  });

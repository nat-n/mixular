'use strict';

angular.module('mixularApp')

  .provider('sections', function sectionsProvider() {
    'use strict';

    var sections = [{
        'title': 'Start',
        'stub': 'start',
      } ,{
        'title': 'Why composable?',
            'stub': 'why-composable'
      } ,{
        'title': 'Tricks',
        'stub': 'tricks',
        'subsections': [{
            'title': 'Controller mixin',
            'stub': 'controller-mixin'
          }, {
            'title': 'Template mixin',
            'stub': 'template-mixin'
          }, {
            'title': 'Monkey patch',
            'stub': 'monkey-patch'
        }]
      } ,{
        'title': 'Example components',
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
        'title': 'Working example',
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

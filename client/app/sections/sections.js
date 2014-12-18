'use strict';

angular.module('mixularApp')

  .provider('sections', function sectionsProvider() {

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
            'title': 'Another Component',
            'stub': 'components'
          }, {
            'title': 'More mixins',
            'stub': 'more-mixins'
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
          sections.order.push(subsection.stub);
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
    };

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


  .run(function ($rootScope, optionLists, actions, formModel) {
    $rootScope.$on('$stateChangeSuccess', function () {
      // scroll to top on state change
      window.scrollTo(0, 0);
    });


    formModel.addSection('opinions', {
      'best-planet-select': '',
      listSwitch: 'long',
      favouriteThing: '',
    });

    formModel.addSection('demo', {
      name: '',
      reason: '',
      planet: '',
      breathing: ''
    });

    // initialise a named list of options
    var favList = {
      long: [
        {value: '', label: '--- Please Select ---'},
        {value: 'thing1', label: 'Ice Cream'},
        {value: 'thing2', label: 'Dogs'},
        {value: 'thing3', label: 'Saturdays'},
        {value: 'thing4', label: 'Sunshine'},
        {value: 'nothing', label: 'Nothing'}
      ],
      short: [
        {value: '', label: '--- Please Select ---'},
        {value: 'thing', label: 'Anything really...'},
        {value: 'nothing', label: 'I don\'t like things.' },
      ]
    };

    optionLists.register('favouriteThings', favList.long);

    // update the list a little while later
    $rootScope.$watch(
      function () { return formModel.opinions.listSwitch; },
      function (listSwitch) {
        optionLists.update('favouriteThings', function(){
          return favList[listSwitch];
        });
      }
    );

    actions.sayHi = function(name) {
      if (name) { alert('Hi ' +  name + '!'); }
    };

    actions.speakGreeting = function(name) {
      var msg = new SpeechSynthesisUtterance('Greetings ' +  name);
      window.speechSynthesis.speak(msg);
    };

  })


  // For collapsing code blocks
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
        var indentSize = parseInt(attrs.abridged);
        scope.indent = '';
        while (indentSize > 0) {
          scope.indent += ' ';
          indentSize--;
        }

        scope.abridged = true;
      }
    };
  });

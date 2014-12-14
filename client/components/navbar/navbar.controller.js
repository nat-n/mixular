'use strict';

angular.module('mixularApp')
  .controller('NavbarCtrl', function ($scope, $state, sections) {

    $scope.sections = sections;
    $scope.isCollapsed = true;

    $scope.isActive = function(stub) {
      if ($state.includes(stub)) {
        return $state.includes(stub);
      }
      var found = false;
      sections.forEach(function (section) {
        if (section.stub === stub) {
          if (section.subsections) {
            section.subsections.forEach(function (subsection) {
              if ($state.includes(subsection.stub)) {
                found = true;
                return;
              }
            });
          }
          return;
        }
      });
      return found;
    };
  });
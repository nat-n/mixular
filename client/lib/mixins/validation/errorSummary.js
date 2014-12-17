'use strict';

angular.module('mixularApp')

	.directive('errorSummary', function($templateCache, validationSets){

		$templateCache.put('error-summary.html',
			'<ul>' +
				'<li ng-repeat="e in errors" ng-bind="e"></li>' +
			'</ul>'
		);

		// UNFINISHED

		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'error-summary.html',
			link: function (scope, elem, attrs) {
				scope.errors = [];

				validationSets.watch(
					attrs.validationSets,
					function (errors) { scope.errors = []; },
					function () { return !scope.$$destroyed; },
					true
				);
			}
		};
	});
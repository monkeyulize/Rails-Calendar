angular.module('myCalendar')
.directive('myDay', function() {
	return {
		restrict: 'E',

		templateUrl: 'js/directives/calDay.html',
		link: function(scope, elems, attrs) {
			scope.isOpen = false;
			scope.open = function() {
				scope.isOpen = true;
			};
			scope.close = function() {
				scope.isOpen = false;
			};
			scope.templateUrl = 'js/directives/editPopover.html';
		}
	};
	
});
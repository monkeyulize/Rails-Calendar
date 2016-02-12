angular.module('myCalendar')
.directive('myDay', function() {
	return {
		restrict: 'E',

		templateUrl: 'home/_calDay.html',
		link: function(scope, elems, attrs) {
			scope.isOpen = false;
			scope.open = function() {
				scope.isOpen = true;
			};
			scope.close = function() {
				scope.isOpen = false;
			};
			scope.templateUrl = 'home/_editPopover.html';
		}
	};
	
});
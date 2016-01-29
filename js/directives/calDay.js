angular.module('myCalendar')
.directive('myDay', function() {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'js/directives/calDay.html'
	};
	
});
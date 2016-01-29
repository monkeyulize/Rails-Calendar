angular.module('myCalendar')
.directive('myDay', function() {
	return {
		restrict: 'E',
		scope: {
			day: '='
		},
		templateUrl: 'js/directives/calDay.html'
	};
	
});
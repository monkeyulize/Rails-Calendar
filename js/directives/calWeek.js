angular.module('myCalendar')
.directive('myWeek', function() {
	return {
		restrict: 'E',
		scope: {
			info: '='
		},
		templateUrl: 'js/directives/calWeek.html'
	};
	
});
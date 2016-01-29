angular.module('myCalendar')
.directive('myDay', function() {
	return {
		restrict: 'E',
		scope: {
			info: '='
		},
		templateUrl: 'js/directives/calDay.html'
	};
	
});
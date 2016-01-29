angular.module('myCalendar')
.controller('MainCtrl', ['$scope', function($scope) {
	$scope.months = ["January", "February", "March", "April", "May", "June", "July",
		"August", "September", "October", "November", "December"];
	$scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	$scope.day = moment();

	
	$scope.current = $scope.day.clone();
	$scope.month = $scope.current.clone();


	$scope.prevMonth = function() {
		$scope.current.subtract(1, 'month');
		$scope.month.subtract(1, 'month');

		createMonth($scope.current.clone());
	}
	$scope.nextMonth = function() {
		$scope.current.add(1, 'month');
		$scope.month.add(1, 'month');

		createMonth($scope.current.clone());
	}


	var daysInMonth = function(month, year) {
		return new Date(year, month+1, 0).getDate();
	};

	var createWeek = function(month, date) {
		var days = [];
		for(var i = 0; i < 7; i++) {
			days.push({
				number: date.date(),
				isCurrentMonth: date.month() === month.month(),
				isToday: $scope.day.isSame(date, 'day'),
				date: date
			});
			date.add(1, 'day');

		}
		return days;

	};
	var createMonth = function(date) {
		var weeks = [];
		var thisDate = date.clone();
		
		var done = false;
		date.date(1);
		date.day(0);

		 while(!done) {

			weeks.push({days: createWeek(thisDate, date.clone())});
			date.add(1, 'week');
			if(!date.isSame(thisDate, 'month')) {
				done = true;
			}


		 }
		 $scope.weeks = weeks;
		 console.log(weeks);
	};
	createMonth($scope.current.clone());

	
}]);
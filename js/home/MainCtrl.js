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
				dayObj: {appt: []},
				date: date.clone()
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
	};
	$scope.select = function(day) {
		if(day.date === $scope.selected) {
			$scope.selected = {};
		} else {
			$scope.selected = day.date;
		}
		
	};
	$scope.action = function() {

		console.log("is open");
	}
	$scope.editPopover = {
		openPop: false,
		open: function() {
			$scope.editPopover.openPop = true;
		},
		close: function() {
			$scope.editPopover.openPop = false;
		},
		templateUrl: 'js/directives/editPopover.html'
	};	
	$scope.removeAppt = function(index, day) {
		day.dayObj.appt.splice(index, 1);
	};
	$scope.editDay = function(editObj, day) {


		if(editObj) {
			if(editObj.appt) day.dayObj.appt.push(editObj.appt);
		}

		
	};

	createMonth($scope.current.clone());

	
}]);
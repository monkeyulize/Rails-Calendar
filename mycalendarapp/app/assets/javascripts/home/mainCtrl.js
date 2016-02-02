angular.module('myCalendar')
.controller('MainCtrl', ['$scope', 'days', function($scope, days) {

	
	$scope.day = moment();

	$scope.days = days.days;
	// console.log($scope.days);
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
			var id = -1;
			var appts = [];
			var filter = $scope.days.filter(function(v) { return moment(v['date']).isSame(date, 'day')});
			if (filter[0]) {
				// console.log(filter[0]);
				id = filter[0].id;
				appts = filter[0].appts;
				// console.log(id);
			}
			days.push({
				dbId: id,
				number: date.date(),
				isCurrentMonth: date.month() === month.month(),
				isToday: $scope.day.isSame(date, 'day'),
				appts: appts,
				date: date.clone()
			});
			date.add(1, 'day');

		}
		// console.log(days);
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

	
	$scope.removeAppt = function(index, day) {
		day.dayObj.appt.splice(index, 1);
	};
	$scope.editDay = function(editObj, day) {
		console.log(editObj);
		console.log(day);
		var o;
		if(editObj) o = editObj.appt; 
		if(o) {
			if(day.dbId == -1) {
				days.create(
					{date: day.date.toDate()},
					function(data) {
						console.log(data);
						day.dbId = data.id;
						days.addAppt(
							day, 
							{body: o},
							function(data) {
								day.appts.push(data.appt);
							}
						);
					}


				);
			} else {
				days.addAppt(
					day, 
					{body: o},
					function(data) {
						day.appts.push(data.appt);
					}
				);
			}
		}

	};

	createMonth($scope.current.clone());

	
}]);
angular.module('myCalendar')
.controller('MainCtrl', ['$scope', 'daysService', function($scope, daysService) {

	
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
			var id = -1;
			var appts = [];
			var filter = daysService.days.filter(function(v) { return moment(v['date']).isSame(date, 'day')});
			if (filter[0]) {
				id = filter[0].id;
				appts = filter[0].appts;
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
		return days;
		

	};
	var createMonth = function(date) {
		daysService.getAll(function() {
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
			
		});

	};
	$scope.select = function(day) {
		if(day.date === $scope.selected) {
			$scope.selected = {};
		} else {
			$scope.selected = day.date;
		}
		
	};

	
	$scope.removeAppt = function(day, appt) {
		daysService.deleteAppt(day, appt);
		day.appts = day.appts.filter(function(e) {
			return e.id != appt.id;
		});
		// daysService.getAll();
	};
	$scope.editDay = function(editObj, day) {
		var o;
		if(editObj) o = editObj.appt; 
		if(o) {
			if(day.dbId == -1) {
				daysService.create(
					{date: day.date.toDate()},
					function(data) {
						day.dbId = data.id;
						daysService.addAppt(
							day, 
							{body: o},
							function(data) {
								day.appts.push(data.appt);
							}
						);
					}


				);
			} else {
				daysService.addAppt(
					day, 
					{body: o},
					function(data) {
						console.log(data)
						day.appts.push(data.appt);
					}
				);
			}
		}
		// daysService.getAll();
		
	};

	createMonth($scope.current.clone());

	
}]);
angular.module('myCalendar')
.controller('MainCtrl', ['$scope', function($scope) {
	$scope.months = ["January", "February", "March", "April", "May", "June", "July",
		"August", "September", "October", "November", "December"];
	$scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	$scope.currMonth = new Date().getMonth();
	$scope.prevMonth = function() {
		$scope.currMonth = ($scope.currMonth - 1) % 12;
		$scope.createMonth($scope.currMonth);
	}
	$scope.nextMonth = function() {
		$scope.currMonth = ($scope.currMonth + 1) % 12;
		$scope.createMonth($scope.currMonth);
	}

	$scope.month = undefined;
	$scope.preMonth = undefined;
	$scope.postMonth = undefined;
	$scope.today = new Date().getDate();
	var daysInMonth = function(month, year) {
		return new Date(year, month+1, 0).getDate();
	};


	$scope.createMonth = function(month) {
		console.log("creating month: " + month);
		$scope.month = new Array(6);
		var todaysDate = new Date();
		var firstDayOfMonth = new Date(todaysDate.getFullYear(), month, 1).getDay();

		var numDaysThisMonth = daysInMonth(month, todaysDate.getFullYear());
		console.log("numDaysThisMonth: " + numDaysThisMonth);
		var lastDayOfMonth = new Date(todaysDate.getFullYear(), month, numDaysThisMonth).getDay();
		var dayOfMonth = 1;
		var currDayOfWeek = firstDayOfMonth;
		for (var i = 0; i < 6; i++) {
			$scope.month[i] = new Array(7);
			if(firstDayOfMonth > 0 ) {
				if(month == 0) {
					var numDaysLastMonth = daysInMonth(12, todaysDate.getFullYear()-1);
				} else {
					var numDaysLastMonth = daysInMonth(month-1, todaysDate.getFullYear());
				}
				
				if(i == 0){
					while(currDayOfWeek > 0) {
					
						$scope.month[i][--currDayOfWeek] = numDaysLastMonth--;

					}
					currDayOfWeek = firstDayOfMonth;
				}
				var j = 1;
				while(currDayOfWeek <= 6) {
					if(dayOfMonth > numDaysThisMonth) {
						$scope.month[i][currDayOfWeek++] = (dayOfMonth++ - numDaysThisMonth);
					} else {
						$scope.month[i][currDayOfWeek++] = dayOfMonth++;
					}
					
					
				}

					currDayOfWeek = 0;
				

					
			}
		}	
		
		console.log($scope.month);


	};
	$scope.createMonth($scope.currMonth);
	$scope.test = "Samuel";
	
}]);
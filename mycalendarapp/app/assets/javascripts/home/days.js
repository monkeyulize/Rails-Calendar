angular.module('myCalendar')
.factory('days', ['$http', function($http) {
	var o = {
		days: []
	};

	o.getAll = function() {
		return $http.get('/days.json').success(function(data) {
			angular.copy(data, o.days);
			
		});

	};

	o.addAppt = function(day, appt, callback) {
		return $http.post('/days/' + day.dbId + '/appts.json', appt).success(function(data) {
			callback(data);
		});
	};
	o.create = function(day, callback) {
		// console.log(day)
		return $http.post('/days.json', day).success(function(data) {
			// o.days.push(data);
			// console.log(data);
			callback(data);
		});
	};

	o.delete = function(day) {
		return $http.delete('/days.json', day).success(function(data) {

		});

	};

	return o;

}]);
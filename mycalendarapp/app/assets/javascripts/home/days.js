angular.module('myCalendar')
.factory('daysService', ['$http', function($http) {
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
		return $http.post('/days.json', day).success(function(data) {
			callback(data);
		});
	};

	o.deleteAppt = function(day, appt) {
		return $http.delete('/days/' + day.dbId + '/appts/' + appt.id + '.json').success(function(data) {
			console.log(data);
		});

	};

	return o;

}]);
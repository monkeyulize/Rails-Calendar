angular.module('myCalendar')
.factory('daysService', ['$http', function($http) {
	var o = {
		days: []
	};

	o.getAll = function(callback) {
		return $http.get('/days.json').then(function successCallback(response) {
			console.log(response);
			angular.copy(response.data, o.days);
			callback();
			//console.log(o.days);
			
		}, function errorCallback(response) {
			console.log("Error");
			callback();
		});

	};

	o.addAppt = function(day, appt, callback) {
		return $http.post('/days/' + day.dbId + '/appts.json', appt).then(function successCallback(response) {

			console.log(response);
			callback(response.data);
		}, function errorCallback(response) {
			console.log(response);
		});
		
	};
	o.create = function(day, callback) {
		return $http.post('/days.json', day).success(function(data) {
			console.log(data);
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
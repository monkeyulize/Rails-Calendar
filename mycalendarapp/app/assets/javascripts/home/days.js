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

	o.create = function(day) {
		return $http.post('/days.json', day).success(function(data) {
			o.days.push(data);
		});
	};


	return o;

}]);
angular.module('myCalendar', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'js/home/_home.html',
			controller: 'MainCtrl'			
		});
		
	$urlRouterProvider.otherwise('home');
	
	
	
}]);
angular.module('myCalendar', ['ui.router', 'ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider', '$uibTooltipProvider', function($stateProvider, $urlRouterProvider, $uibTooltipProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'js/home/_home.html',
			controller: 'MainCtrl'			
		});
		
	$urlRouterProvider.otherwise('home');
	

	
}]);
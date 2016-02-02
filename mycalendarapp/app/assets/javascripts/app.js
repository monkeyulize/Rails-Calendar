angular.module('myCalendar', ['ui.router', 'ui.bootstrap', 'templates'])
.config(['$stateProvider', '$urlRouterProvider', '$uibTooltipProvider', function($stateProvider, $urlRouterProvider, $uibTooltipProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/_home.html',
			controller: 'MainCtrl',
			resolve: {
				dayPromise: ['days', function(days) {
					return days.getAll();
				}]
			}		
		});
		
	$urlRouterProvider.otherwise('home');
	

	
}]);
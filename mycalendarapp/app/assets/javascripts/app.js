angular.module('myCalendar', ['ui.router', 'ui.bootstrap', 'templates'])
.config(['$stateProvider', '$urlRouterProvider', '$uibTooltipProvider', function($stateProvider, $urlRouterProvider, $uibTooltipProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/_home.html',
			controller: 'MainCtrl',
			resolve: {
				dayPromise: ['daysService', function(daysService) {
					return daysService.getAll();
				}]
			}		
		});
		
	$urlRouterProvider.otherwise('home');
	

	
}]);
angular.module('myCalendar', ['ui.router', 'ui.bootstrap', 'templates', 'Devise'])
.config(['$stateProvider', '$urlRouterProvider', '$uibTooltipProvider', function($stateProvider, $urlRouterProvider, $uibTooltipProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/_home.html',
			controller: 'MainCtrl',
			resolve: {
				dayPromise: ['daysService', 'Auth', function(daysService, Auth) {
					return daysService.getAll();

					
				}]
			}		
		})
		.state('login', {
			url: '/login',
			templateUrl: 'auth/_login.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'Auth', function($state, Auth){
				Auth.currentUser().then(function() {
					$state.go('home');
				})
			}]
		})
		.state('register', {
			url: '/register',
			templateUrl: 'auth/_register.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'Auth', function($state, Auth){
				Auth.currentUser().then(function() {
					$state.go('home');
				})
			}]
		});

		
	$urlRouterProvider.otherwise('home');
	

	
}]);
(function () {
	'use strict';
 
	angular.module('myApp', ['ui.router', 'home'])
		.config(['$stateProvider',
				 function ($stateProvider){
					 $stateProvider
						 .state('/', {
						 url: '',
						 controller: 'homeController',
						 controllerAs: 'vm',
						 templateUrl: 'home/home.tpl.html'
					 });
				 }
				]);

})(); 

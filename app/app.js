(function () {
	'use strict';
 
	angular.module('myApp', ['ui.router', 'home', 'detail'])
		.config(['$stateProvider',
				 function ($stateProvider){
					 $stateProvider
						 .state('/', {
						 url: '',
						 controller: 'homeController',
						 controllerAs: 'vm',
						 templateUrl: 'home/home.tpl.html'
					 }).state('detail', {
						 url: '/detail',
						 controller: 'detailController',
						 controllerAs: 'vm',
						 templateUrl: 'detail/detail.tpl.html',
						 params: {params: null}
					 });
				 }
				]);

})(); 

angular.module('Services',[])
	.factory('TaskListFactory', TaskListFactory)
	TaskListFactory.$inject = ['$http'];

function TaskListFactory($http) {

};
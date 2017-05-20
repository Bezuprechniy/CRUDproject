angular.module('Controllers', [])
	.controller('mainCtrl', mainCtrl);
	mainCtrl.$inject = ['$scope', 'TaskListFactory'];

function mainCtrl($scope, TaskListFactory) {

	$scope.user = {
		name: "Petro Zhuk",
		tasks: TaskListFactory.getAllTasks()
	};

	$scope.addNewTask = function (description) {
		TaskListFactory.addTask(description);
		$scope.description = null;
	};

};
angular.module('Controllers', [])
	.controller('mainCtrl', mainCtrl);
	mainCtrl.$inject = ['$scope', 'TaskListFactory'];

function mainCtrl($scope, TaskListFactory) {

	$scope.toggle = false;
	$scope.user = {
		name: "Petro Zhuk",
		tasks: TaskListFactory.getAllTasks()
	};

	$scope.addNewTask = function (description) {
		TaskListFactory.addTask(description);
		$scope.description = null;
	};
	
	$scope.updateTask = function () {
		TaskListFactory.updateTask($scope.editTask);
		$scope.toggle = false;
	};

	$scope.removeTask = function (index) {
		TaskListFactory.removeTask(index);
	};

	$scope.isDone = function (task) {
		TaskListFactory.isDone(task);
	};

	$scope.edit = function (editTask) {
		$scope.editTask = {
			id: editTask.id,
			description: editTask.description,
			isDone: editTask.isDone
		};
		$scope.toggle = true;
	}

};
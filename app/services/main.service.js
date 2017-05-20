angular.module('Services',[])
	.factory('TaskListFactory', TaskListFactory)
	TaskListFactory.$inject = ['$http'];

function TaskListFactory($http) {
	var tasks = [];

	//API
	return {
		getAllTasks: getAllTasks,
		addTask: addTask
	};

	/**
	 * get all task from task table
	 */
	function getAllTasks() {
		refreshData();
		return tasks;
	};

	function refreshData() {
		$http.get('http://localhost:3000/get-tasks')
			.success(function (res) {
				tasks.splice(0, tasks.length);
				for (var i = 0; i < res.length; i++) {
					var task = {
						id: res[i].id,
						description: res[i].description,
						isDone: res[i].isDone === 0 ? true : false
					};
					tasks.push(task)
				}
			})
			.error(function (err) {
				console.log('Error in get', err);
			})
	};

	/**
	 * Add new task in task table
	 * @param newTask String
	 */
	function addTask(newTask) {
		var task = {
			description: newTask,
			isDone: 0
		};
		$http.post('http://localhost:3000/add-task', task)
			.success(function (res) {
				refreshData();
				console.log('Success', res);
			})
			.error(function (err) {
				console.log('Add task error', err);
			})
	};

};
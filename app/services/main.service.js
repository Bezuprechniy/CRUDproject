angular.module('Services',[])
	.factory('TaskListFactory', TaskListFactory)
	TaskListFactory.$inject = ['$http'];

function TaskListFactory($http) {
	var tasks = [];

	//API
	return {
		getAllTasks: getAllTasks,
		addTask: addTask,
		updateTask: updateTask,
		removeTask: removeTask,
		isDone: isDone
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
						isDone: res[i].isDone.data[0] ? true : false
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

	function updateTask(editTask) {
		var task = {
			description: editTask.description,
			isDone: editTask.isDone,
			id: editTask.id
		};
		$http.post('http://localhost:3000/update-task', task)
			.success(function (res) {
				refreshData();
				console.log(res);
			})
			.error(function (err) {
				console.log(err);
			});
	};

	function removeTask(task) {
		$http.post('http://localhost:3000/remove-task', {id: task.id})
			.success(function (res) {
				refreshData();
				console.log(res);
			})
			.error(function (err) {
				console.log(err);
			});
	};

	function isDone(task) {
		var change_status = {
			id: task.id,
			description: task.description,
			isDone: task.isDone ? 1 : 0
		};
		// change_status.status = change_status.status ? 1 : 0;
		console.log(change_status.isDone, change_status.id);
		$http.post('http://localhost:3000/update-task', change_status)
			.success(function (res) {
				console.log('Success', res);
			})
			.error(function (err) {
				console.log('Error in status', err);
			})
	};

};
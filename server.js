var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.use(cors());
app.use(bodyParser.json());

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1107altair',
	database: 'tasklist'
});

var initDb = function () {
	connection.query('' +
		'CREATE TABLE IF NOT EXISTS Tasks (' +
		'id int(11) NOT NULL AUTO_INCREMENT,' +
		'description varchar(50), ' +
		'isDone bit(1),' +
		'PRIMARY KEY(id) )',
		function (err) {
			if (err) throw err;
			console.log('CREATE TABLE Tasks');
		});
};

initDb();

app.get('/get-tasks', function(req, res){
	connection.query('SELECT * FROM Tasks', function (err, rows) {
		if (err) throw err;
		console.log('get all task, length: ' + rows.length);
		res.status(200).send(rows);
	});
});

app.post('/add-task', function (req, res) {
	connection.query('INSERT INTO Tasks SET ?', req.body, function (err, result) {
			if (err) throw err;
			console.log('task added to database with id: ' + result.insertId);
		});
	res.send(200);
});

app.post('/update-task', function (req, res) {
	connection.query('UPDATE Tasks SET description = ?, isDone = ? WHERE id = ?',
		[req.body.description, req.body.isDone, req.body.id],
		function (err) {
			if (err) throw err;
			console.log('task update where id: ' + req.body.id);
		});
	res.send(200);
});

app.post('/remove-task', function (req, res) {
	connection.query('DELETE FROM Tasks WHERE id = ?', req.body.id, function (err) {
			if (err) throw err;
			console.log('task delete where id: ' + req.body.id);
		});
	res.send(200);
});

app.listen(3000, function (err) {
	if(err) throw err;
	console.log('Server start on port 3000!');
});
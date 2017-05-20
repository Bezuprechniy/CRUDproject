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

app.listen(3000, err => {
	if(err) throw err;
	console.log('Server start on port 3000!');
});
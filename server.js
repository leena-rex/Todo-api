var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get ('/', function(req, res) {

	res.send('Todo API Root');
});


// GET /todos ( with call back function. in callfunction need to use json)
app.get('/todos', function (req, res){
	res.json(todos);	
});
// GET /todos/:id
app.get('/todos/:id', function (req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findwhere(todos, {id: todoID});

	if (matchedTodo) {
		res.json(matchedTodo);

	}else {
		// else send not found status
 		res.status(404).send();

	}

});

// POST - send the json object along with request to server to store in todo list

app.post('/todos', function (req, res){
	var body = req.body;

	//add id field
	body.id = todoNextId++;
	//push body to into array
	todos.push(body);

	console.log('description: ' + body.description);

	res.json(body);

});


app.listen(PORT, function () {
	console.log('Express Listening on port ' + PORT);
});

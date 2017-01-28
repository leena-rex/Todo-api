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
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (matchedTodo) {
		res.json(matchedTodo);

	}else {
		// else send not found status
 		res.status(404).send();

	}

});

// POST - send the json object along with request to server to store in todo list

app.post('/todos', function (req, res){
	//var body = req.body; // Use _.pick to only pick description and completed
	var body = _.pick(req.body, 'description', 'completed');


	if (!_.isBoolean(body.completed) || _.isString(body.description) || body.description.trim().length === 0) {

		return res.status(400).send();
	}

	// set body.description to be trimmed value
	body.description = body.description.trim();

	//add id field
	body.id = todoNextId++;
	//push body to into array
	todos.push(body);

	console.log('description: ' + body.description);

	res.json(body);

});


// DELETE /todos/:id
app.delete('/todos/:id', function (req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (!matchedTodo) {
		// else send not found status
 		//res.status(404).json({"error": "No todo found with that id"});
 		res.status(400).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}

});


app.listen(PORT, function () {
	console.log('Express Listening on port ' + PORT);
});

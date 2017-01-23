var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false
}, {
	id: 3,
	description: 'Learn Nodejs',
	completed: true
}];

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
	var matchedTodo;

	// Iterate of todos array. Find the match
	todos.forEach(function (todo){

		if (todoId === todo.id) {
			matchedTodo = todo;

		}

	});

	if (matchedTodo) {
		res.json(matchedTodo);

	}else {
		// else send not found status
 		res.status(404).send();

	}

});

app.listen(PORT, function () {
	console.log('Express Listening on port ' + PORT);
});

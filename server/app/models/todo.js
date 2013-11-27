var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
	userId: {type: String},
	content: {type: String},
	done: {type: Boolean}
});

var modelName = "Todo";
var collectionName = "Todos"; 
mongoose.model(modelName, todoSchema, collectionName);
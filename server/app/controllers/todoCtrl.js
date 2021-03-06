var mongoose =     require('mongoose')
	, db =         require('../models/todo.js')
	, Todo =       mongoose.model('Todo');

exports.newTodo = function (req, res) {
	var doc = new Todo(req.body);
    doc.save(function (err) {
        var retObj = {
            meta: {"action": "create", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    });
};

exports.listTodo = function (req, res) {
    var conditions, fields, options, id;
    id = {userId: req.user.email};
    conditions = {};
    fields = {};
    options = {};

    Todo
        .find(id)
        .exec(function (err, doc) {
            var retObj = {
                meta: {"action": "list", "timestamp": new Date(), "conditions": conditions},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        });
};

exports.deleteTodo = function (req, res) {
    var conditions, callback, retObj;
    conditions = {_id: req.params.id};
    
    Todo.remove(conditions, function (err, doc) {
        retObj = {
            meta: {"action": "delete", 'timestamp': new Date()},
            doc: doc,
            err: err
        };
        return res.json(retObj);
    });
};














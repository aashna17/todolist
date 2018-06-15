var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db=mongojs('mongodb://aashna:aashna17@ds119768.mlab.com:19768/mytasklist_aashna',['todos']);

//GET All Todos
router.get('/todos', function (req, res, next) {
    db.todos.find(function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

//GET Single Todos
router.get('/todo/:id', function (req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, todo) {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

//Save Todo 
router.post('/todo', function (req, res, next) {
    var todo = req.body;
    //Check validity of data
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({ "error": "Invalid Data" });
    } else {
        db.todos.save(todo, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});

//UPDATE Todos
router.put('/todo/:id', function (req, res, next) {
    var todo = req.body;
    var updateObject = {};

    if (todo.isCompleted) {
        updateObject.isCompleted = todo.isCompleted;
    }

    if (todo.text) {
        updateObject.text = todo.text;
    }

    if (!updateObject) {
        res.status(400);
        res.json({ "error": "Invalid Data" });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updateObject, {}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }

});

//DELETE todo
router.delete('/todo/:id', function (req, res, next) {

        db.todos.remove({
            _id: mongojs.ObjectId(req.params.id)
        }, '', function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
});

module.exports = router;
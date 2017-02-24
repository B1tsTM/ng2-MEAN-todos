var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds063715.mlab.com:63715/mean-todos-app', ['todos']);

// Get All Todos
router.get('/todos', function(req, res, next) {
  db.todos.find((err, todos) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json(todos);
    }
  });
});

// Get Single Todo
router.get('/todo/:id', (req, res, next) => {
  db.todos.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, todo) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json(todo);
    }
  });
});

// Save Todo
router.post('/todo', (req, res, next) => {
  let todo = req.body;
  if (!todo.text || !(todo.isCompleted + '')) {
    res.status(400);
    res.json({
      "error": "Invalid data!"
    });
  } else {
    db.todos.save(todo, (err, result) => {
      if(err) {
      return res.send(err);
    } else {
      return res.json(result);
    }
    });
  }
});

// Update Todo
router.put('/todo/:id', (req, res, next) => {
  let todo = req.body;
  let updObj = {};

  if(todo.isCompleted) {
    updObj.isCompleted = todo.isCompleted;
  }

  if (todo.text) {
    updObj.text = todo.text;
  }

  if (!updObj) {
    res.status(400);
    res.json({
      "error": "Invalid data!"
    });
  } else {
    db.todos.update({_id: mongojs.ObjectId(req.params.id)}, updObj, {}, (err, result) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json(result);
    }
    });
  }
});

// Delete Todo
router.delete('/todo/:id', (req, res, next) => {
  db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, '', (err, result) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json(result);
    }
  });
});

module.exports = router;

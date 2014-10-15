'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Tutorial = mongoose.model('Tutorial'),
 _ = require('lodash');



// Der Parameter 'id' entspricht dem zugeordneten Parameter. Hier: 'tutorialId' (Siehe app.param in routes.js)
exports.tutorial = function(req, res, next, id) {
  // Prüfen ob die id gültig ist, um zu verhindern, dass eine ClassCast
  // Exception von Mongoose ausgelöst wird.
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
   return res.status(404).json({error: 'Tutorial existiert nicht.'});
 }

 Tutorial.findOne({'_id':id}, function(err, tutorial) {
  if (err)  return next(err);
  if (!tutorial) {
    var error = new Error('Tutorial konnte nicht geladen werden: ' + id);
    return next(error);
  }

  req.tutorial = tutorial;
  next();
});
};

exports.show = function(req, res) {
  res.json(req.tutorial);
};

exports.all = function(req, res) {
  Tutorial.find({}, function(err, tutorials) {
    res.json(tutorials);
  });
};

exports.create = function(req, res) {
  console.log('tutorial exports.create');
  var tutorial = new Tutorial(req.body);

  tutorial.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the tutorial'
      });
    }
    res.json(tutorial);

  });
};

exports.destroy = function(req, res) {
  var tutorial = req.tutorial;

  tutorial.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the tutorial'
      });
    }
    res.json(tutorial);
  });
};

exports.update = function(req, res) {
  var tutorial = req.tutorial;
  
  /*
  lodash-Funktion:
  Überschreibt quasi die Eigenschaften von tutorial mit den neuen Werten
  */
  tutorial = _.extend(tutorial, req.body);

  tutorial.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the tutorial'
      });
    }
    res.json(tutorial);
  });
};



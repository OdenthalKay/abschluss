'use strict';

/*
Projekte können nur erstellt und angezeigt werden.
Löschen und Updaten ist hier nicht implementiert.
*/

var mongoose = require('mongoose'),
Project = mongoose.model('Project');

exports.create = function(req, res) {
  var project = new Project(req.body); 
  req.tutorial.projects.push(project);
  req.tutorial.save(function (err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the project'
      });
    }
    res.json(project);
  });
};

exports.project = function(req, res, next, id) {
  req.project = req.tutorial.projects.id(id);
  if (req.project === null) {
    return next(new Error('Projekt konnte nicht geladen werden: ' + id));
  }
  next();
};

exports.show = function(req, res) {
 res.json(req.project);
};

exports.all = function(req, res) {
  res.json(req.tutorial.projects);
};








'use strict';



var mongoose = require('mongoose'),
Project = mongoose.model('Project');
//_ = require('lodash');


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








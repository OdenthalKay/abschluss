'use strict';

// Models können immer so abgeholt werden, keine dependency zwischen packages notwendig
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/*
WICHTIG:
Mit 'require' Sicherstellen, dass alle benötigten Schemas zuvor geladen wurden.
Ansonsten kann es zu einer 'Missing Schema'-Exception kommen und die 
Anwendung stürzt ab/startet nicht.
*/
require('../../../slideshows/server/models/Slideshow.js');
require('../../../projects/server/models/project.js');
require('../../../comments/server/models/Comment.js');

var SlideshowModel = mongoose.model('Slideshow');
var SlideshowSchema = SlideshowModel.schema; 
var CommentModel = mongoose.model('Comment');
var CommentSchema = CommentModel.schema; 
var ProjectModel = mongoose.model('Project');
var ProjectSchema = ProjectModel.schema; 

var TutorialSchema = new Schema({
  name: {
  	type: String
  },
  slideshows: [SlideshowSchema],
  projects: [ProjectSchema],
  comments: [CommentSchema]
});

mongoose.model('Tutorial', TutorialSchema);

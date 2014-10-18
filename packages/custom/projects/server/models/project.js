'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var QuizSchema = new Schema({
	question: String,
	option1: String,
	option2: String,
	correctOption: Number
});

var ProjectSchema = new Schema({
	quizData: [QuizSchema],
	questionsData: {
		descriptionText: String,
		count: Number
	},
	exercisesData: [String] // Nur Tetxfragen
});

mongoose.model('Project', ProjectSchema);


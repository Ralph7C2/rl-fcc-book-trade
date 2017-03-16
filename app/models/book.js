var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
	name: String
});

var bookSchema = mongoose.Schema({
	title: String,
	author: String,
	ISBN: String,
	genre: String,
	condition: String,
	tags: [tagSchema]
});

module.exports = mongoose.model('Book', bookSchema);
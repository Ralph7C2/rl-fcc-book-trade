var Q = require('q');
var Book = require('../models/book.js');
var User = require('../models/user.js');

var service = {};

service.loadBooks = function(cb) {
	Book.find({}, function(err, books) {
		promises = [];
		books.forEach(function(book) {
			promises.push(getBookCount(book));
		})
		Q.all(promises).then(function(bookCounts) {
			console.log(bookCounts);
			cb(bookCounts);
		})
	});
}

getBookCount = function(book) {
	var deferred = Q.defer();
	User.find({bookList: book._id}).count(function(err, count) {
		console.log(count);
		deferred.resolve({book: book, count: count});
	});
	return deferred.promise;
}

module.exports = service;
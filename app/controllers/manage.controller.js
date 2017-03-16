var Q = require('q');
var Books = require('../models/book.js');

var service = {}

service.loadBooks = function(user, cb) {
	promises = [];
	user.bookList.forEach(function(id) {
		promises.push(getBookById(id));
	});
	Q.all(promises).then(function(data) {
		cb(data);
	});
};

getBookById = function(id) {
	var deferred = Q.defer();
	Books.findById(id, function(err, book) {
		if(err) return deferred.reject(err);
		if(!book) deferred.reject({error: "No book found"});
		return deferred.resolve(book);
	});
	return deferred.promise;
};

module.exports = service;
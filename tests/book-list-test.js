var chai = require('chai');
var expect = chai.expect;

var BookList = require('../app/book-list.js');

describe('BookList', function() {
	it('getCount() should return 0 if no books in list', function() {
		var bookList = new BookList([]);
		expect(bookList.getCount()).to.equal(0);
	});

	it('getCount() should return the number of books in list', function() {
		var bookList = new BookList([{
			id: 1,
			title: 'A book',
			author: 'Joe Name'
		},{
			id: 2,
			title: 'Another book',
			author: 'Neil Stephenson'
		}]);

		expect(bookList.getCount()).to.equal(2);
	});
});
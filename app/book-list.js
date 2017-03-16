function BookList(books) {
	this._books = books;
}

BookList.prototype.getCount = function() {
	return this._books.length;
};

module.exports = BookList;
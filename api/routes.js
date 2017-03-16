var express = require('express');
var router = express.Router();
var User = require('../app/models/user.js');
var Book = require('../app/models/book.js');

router.post('/addbook/:userid', function(req, res) {
	console.log("Post request received for user "+req.params.userid);
	User.findById(req.params.userid, function(err, user) {
		if(err) {
			return res.json({status: 'fail', message: 'Error looking up user'});
		}
		if(!user) {
			return res.json({status: 'fail', message: 'User not found'});
		}
		Book.findOne({title: req.body.title}, function(err, book) {
			if(err) {
				return res.json({status: 'fail', message: 'Error looking up book'});;
			}
			if(book) {
				user.bookList.push(book._id);
				user.save(function(err) {
					res.json({status: 'success', message: 'Book found and added to user'});
				});
			} else {
				book = new Book();
				book.title = req.body.title;
				book.author = req.body.author;
				book.save(function(err, book) {
					if(!user.bookList.includes(book._id)) {
						user.bookList.push(book._id);
						user.save(function(err) {
							res.json({status: 'success', message: 'Book added and added to user'});
						});
					} else {
						res.json({status: 'fail', message: 'User already has book'});
					}
				});
			}
		});
	});
	console.log(req.body);
});

module.exports = router;
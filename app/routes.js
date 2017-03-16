var User = require('./models/user.js');
var NavLinks = require('./helpers/navlinks.js');
var manageController = require('./controllers/manage.controller.js');
var browseController = require('./controllers/browse.controller.js');
var navLinks = new NavLinks();

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index.ejs', {
			navLinks: [navLinks.getHome(true), navLinks.getManage(false), navLinks.getBrowse(false), navLinks.getDashboard(false)],
			user: req.user
		});
	});

	app.get('/manage', function(req, res) {
		manageController.loadBooks(req.user, function(books) {
			res.render('manage.ejs', {
				navLinks: [navLinks.getHome(false), navLinks.getManage(true), navLinks.getBrowse(false), navLinks.getDashboard(false)],
				user: req.user,
				books: books
			});
		});
	});

	app.get('/browse', function(req, res) {
		browseController.loadBooks(function(books) {
			res.render('browse.ejs', {
				navLinks: [navLinks.getHome(false), navLinks.getManage(false), navLinks.getBrowse(true), navLinks.getDashboard(false)],
				user: req.user,
				books: books
			});
		});
	});

	app.get('/dashboard', /*isLoggedIn,*/ function(req, res) {
		res.render('dashboard.ejs', {
			navLinks: [navLinks.getHome(false), navLinks.getManage(false), navLinks.getBrowse(false), navLinks.getDashboard(true)],
			user: req.user
		});
	});

	app.get('/login', function(req, res) {
		res.render('login.ejs', {
			message: req.flash('login-message')
		});
	});
	
	app.post('/login', function(req, res) {
			User.findOne({'local.email' : req.body.email}, function(err, user) {
				if(err) {
					req.flash('login-message', 'Error looking up email address.');
					return res.redirect('/login');
				}
				if(!user) {
					req.flash('login-message', 'Email address or password incorrect.');
					return res.redirect('/login');
				}
				if(user.validPassword(req.body.password)) {
					req.session.user = user;
					res.redirect('/');
				} else {
					req.flash('login-message', 'Email address or password incorrect.');
					return res.redirect('/login');
				}
			});
	});
	
	app.get('/signup', function(req, res) {
		res.render('signup.ejs', {
			message: req.flash('signup-message'),
			user: req.user
		});
	});
	
	app.post('/signup', function(req, res){
		console.log(req.body);
		User.findOne({ 'local.email' : req.body.email}, function(err, user) {
			if(err) {
				req.flash('signup-message', 'Error looking up email address.');
				return res.rediret('/signup');
			}
			if(user) {
				req.flash('signup-message', 'Email already taken.');
				return res.redirect('/signup');
			}
			newUser = new User();
			newUser.local.email = req.body.email;
			newUser.local.password = newUser.generateHash(req.body.password);
			newUser.save(function(err, user) {
				if(err) {
					req.flash('signup-message', 'Error saving new user');
					return res.rediect('/signup');
				}
				req.session.user = user;
				res.redirect('/');
			});
		});
	});
}
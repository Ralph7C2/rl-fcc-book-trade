require('dotenv').load();
var express = require('express');
var mongoose = require('mongoose');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');

var configDB = require('./config/database.js');

var User = require('./app/models/user.js');

mongoose.connect(configDB.url);
mongoose.Promise = global.Promise;

var app = express();
var port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended :true}));

app.set('view engine', 'ejs');

app.use(session({saveUninitialized:false, resave: false, secret: 'keyboard cat'}));
app.use(flash());

app.use(function(req, res, next) {
	console.log(req.session);
	if(req.session.user) {
		req.user = req.session.user;
	}
	next();
});

app.use(express.static(__dirname+'/public'));

app.use('/api', require('./api/routes.js'));
require('./app/routes.js')(app);

app.listen(port, function() {
	console.log("Ready to rock on port "+port);
});
/**
 * Setting up express server and requirements for server to run. Server can be started by
 * doing 'npm start node'
 */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', function (req, res, next) {
	if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
		res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
	} else if (process.env.NODE_ENV === 'production' && req.headers.host.match(/^www/)) {
		res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
	} else {
		next();
	}
});

/**
 * Serving client directory so that server has access to all JavaScript and CSS files.
 *
 * Directing all routes to index.html, hence the '*'
 */
app.use('/client', express.static(__dirname + '/../client'));
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../', 'index.html'));
});

/**
 * Setting port to default port if one is set, if not (local), set port to 3000 and start
 * server.
 */
var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Listening on port " + port);
});

module.exports = app;
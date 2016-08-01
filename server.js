var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3033);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/getpost',function(req,res){
	var params = [];
	console.log(req.query);
	for(var p in req.query){
		console.log(p);
		console.log(req.query[p]);
		params.push({"name" : p , "value" :req.query[p]});
	}
	var context = [];
	context.type = "GET";
	context.item = params;
	res.render('getpost', context);
});

app.post('/getpost' ,function(req,res){
	var params = [];
	for(var p in req.body){
		params.push({"name" : p , "value" :req.body[p]});
	}
	var context = [];
	context.type = "POST";
	context.item = params;
	res.render('getpost', context);
});


app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

function genContext(){
  var stuffToDisplay = {};
  stuffToDisplay.rand = (Math.random()*10);
  return stuffToDisplay;
}
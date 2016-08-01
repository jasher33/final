var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3047);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql');

var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});

app.get('/',function(req,res){
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
	res.render('home');
});

/*Handlebars.registerHelper("table", function() {
  console.log("blah");
});*/

app.post('/' ,function(req,res){
	/*var params = [];
	for(var p in req.body){
		params.push({"name" : p , "value" :req.body[p]});
	}
	var context = [];
	context.type = "POST";
	context.item = params;
	res.render('getpost', context);*/
	
	 var context = {};
		//pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?????)", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function(err, result){
		pool.query("INSERT INTO workouts (`name`) VALUES (?)", [req.body.name], function(err, result){
		
		if(err){
		  next(err);
		  return;
		}
		context.results = "Inserted id " + result.insertId;
		console.log(context);
		res.render('home');
	});
  
	//console.log(req);
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home'/*,context*/);
    })
  });
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
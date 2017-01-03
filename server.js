/**
 * Created by DMehta on 1/2/2017.
 */
var express=require('express');
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var database=require('./config/database');
var port  	= process.env.PORT || 9080;

mongoose.connect(database.Url);

var app=express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 									// parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


require('./app_start/routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);





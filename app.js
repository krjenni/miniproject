const express = require('express');
var app = express();
const path = require('path');
const router = express.Router();
var bodyParser=require("body-parser");
app.use(express.static(__dirname+'/'));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/info');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
	
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
   
        res.sendFile(path.join(__dirname+'/signup_success.html'));
      
})


app.post('/booked', function(req,res){

	var hname = req.body.hname;
	var time =req.body.time;
	var date = req.body.date;
	
	var hall = {
		"hname": hname,
		"time":time,
		"date":date,
		}
		db.collection('halldetails').insertOne(hall,function(err, collection){
			if (err) throw err;
			console.log("Record inserted Successfully");
				
		});
	   
			res.sendFile(path.join(__dirname+'/hallbooked.html'));
		  
	})
	


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
 
});

router.get('/gallery',function(req,res){
  res.sendFile(path.join(__dirname+'/gallery.html'));
});

router.get('/index',function(req,res){
  res.sendFile(path.join(__dirname+'/book.html'));
});
router.get('/seminarbook',function(req,res){
	res.sendFile(path.join(__dirname+'/seminar_book.html'));
  });


app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
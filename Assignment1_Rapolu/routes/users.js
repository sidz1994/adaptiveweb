var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User= require('../models/user');
let currentUser;

// Register
router.get('/register', function(req, res){
	res.render('register');
});
// Login
router.get('/login', function(req, res){
	res.render('login');
});

//behavioral logs
router.get('/logs', function(req, res){
	res.render('logs');
});

// Register
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is Not valid').isEmail();

	req.checkBody('username', 'username required').notEmpty();	
	req.checkBody('password', 'Name is required').notEmpty();
	req.checkBody('password2', 'Name is required').equals(req.body.password);	

	var errors = req.validationErrors();
	if(errors){
		res.render('register',{errors:errors});
	}
	else{
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password,
		})
		User.createUser(newUser, function(err, user){
			if(err) throw err;
		});

		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/users/login');	
	}
});
//login authenticate
passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	currentUser = username;
   	// console.log(currentUser);
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			user.history.addToSet(new Date());		
			//user.update({'$push':{'date':{'$each': new Date(),'$position':0}}})
			user.save(function(err) {
			if(err) throw err;
			});
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
}));

//Receiving data
//module.exports= currentUser;
router.post('/datarx', function(req, res){
    	User.getUserByUsername(currentUser, function(err, user){
  	 		if(err) throw err;
		//console.log("inside datarx:"+req.body.text);
	    var text = req.body.text.trim().split("|");
	    var key=text[0].trim();
  	    var value=text[1];  	    
	    var stamp=req.body.stamp;
	    switch(key){
	    	case "up vote": user.Vote.addToSet("UpVoted answer in: "+value+" at "+stamp);		
	    					user.save(function(err) {if(err) throw err;});
							break;
		    case "down vote": user.Vote.addToSet("DownVoted answer in: "+value+" at "+stamp);
		    				 user.save(function(err) {if(err) throw err;});
							break;
		    case "add a comment": user.Comment_Share.addToSet("Commented on Answer: "+value+" at "+stamp);	
							user.save(function(err) {if(err) throw err;});
							break;
		    case "share": user.Comment_Share.addToSet("Shared Answer for: "+value+" at "+stamp);
							user.save(function(err) {if(err) throw err;});
							break;
			case "Ask Question" : user.AskedQuestion.addToSet(stamp);
							user.save(function(err) {if(err) throw err;});
							break;
			case "ask your own question" : user.AskedQuestion.addToSet(stamp);
							user.save(function(err) {if(err) throw err;});
							break;
			case "Question clicked" :user.LinkSelected.addToSet(value+" at "+stamp);
							user.save(function(err) {if(err) throw err;});
							break;
			default : user.TextSelected.addToSet(key+" at "+stamp);
							user.save(function(err) {if(err) throw err;});
							break;
		}
		user.save(function(err) {if(err) throw err;});
	});
  });

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
});

//logout 
router.get('/logout', function(req,res){
	req.logout();
	req.flash('success_msg', 'you are logged out');
	res.redirect('/users/login');
})
  
module.exports = router;
var express=require("express");
var router=express.Router();

var User= require("../moduls/user");
var passport=require("passport");
router.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic

router.get("/", function(req, res){
    res.render("home");
});


router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
			req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
		   req.flash("success","login success Nice to meet you "+req.body.username);
           res.redirect("/campgrounds"); 
        });
    });
});

// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
router.get("/logout", function(req, res){
	
   req.logout();
   req.flash("success","logOut success");
   res.redirect("/campgrounds");
});


module.exports=router;

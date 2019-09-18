var express=require("express");
var app=express();
var bodyparsel=require("body-parser");
var mongoose=require("mongoose");
var localstrategy            =require("passport-local");
var passportLocalMongoose    =require("passport-local-mongoose");
var passport                 =require("passport");
var User= require("./moduls/user");
var campGroundRoutes=require("./routes/campground");
var commentRoutes=require("./routes/comments");
var authRoutes=require("./routes/auth");
var methodOverride=require("method-override");
var flash=require("connect-flash");
app.use(bodyparsel.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));

app.use(require("express-session")({
	secret:"to do or to die",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect(process.env.DATABASEURL,{
	useNewUrlParser:true,
	
	useCreateIndex:true
}).then(()=>{
	console.log("connected to Db");
}).catch(err=> {
	console.log("Error",err.message);
});
app.locals.moment=require("moment");
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//========================================================================================
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.nameOfUser=getname(req.user);
	res.locals.messageError=req.flash("error");
	res.locals.messageSuccess=req.flash("success");
	
	next();
});
//========================================================================================
function getname(name){
	if(name==undefined){
		return undefined;
	}
	//str.substring(1, 4);
	//include first not the last
	for(var i=0;i<name.username.length;i++){
		if(name.username[i]==='@'){
			return name.username.substring(0,i);
		}
	}
	return name.username;
}

var  Campground= require("./moduls/camp.js");
var Comment=require("./moduls/comment.js");
var seed=require("./seed");
//seed();

app.use("/campgrounds",campGroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});


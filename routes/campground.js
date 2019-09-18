var express=require("express");
var router=express.Router();

var  Campground= require("../moduls/camp.js");

var middelware=require("../middleware/index.js");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("Index",{campGround:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", middelware.islogedInd,function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.url;
    var desc = req.body.description;
	var price=req.body.price;
	console.log(price);
    var newCampground = {name: name, image: image,price:price, description: desc,createBy:{
		id:req.user,
		username:getname(req.user)
		
	}};
	
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
			req.flash("success","compnant added successfully");
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new",middelware.islogedInd, function(req, res){
   res.render("new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {show: foundCampground});
        }
    });
});

// edit 

router.get("/:id/edit",middelware.ownerCampGround,function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		if(err){
			console.log(err);
		}else{
				res.render("edit",{camp:camp});

		}
	});
});

//UPDATE
router.put("/:id",middelware.ownerCampGround,function(req,res){
	
	Campground.findByIdAndUpdate(req.params.id,{
		name:req.body.name,
		image:req.body.url,
		description:req.body.description,
		price:req.body.price
		
	},
		function(err,camp){
		if(err){
			console.log(err);
			res.redirect("/campgrounds/"+req.params.id);
		}else{
			req.flash("success","update Done");
			res.redirect("/campgrounds/"+req.params.id);

		}
		
	});
		   });

//Delete 

router.delete("/:id",middelware.ownerCampGround,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err);
		}else{
			req.flash("success","Deleted Done");
			res.redirect("/campgrounds");
		}
	});
});


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
module.exports=router;


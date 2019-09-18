var express=require("express");
var router=express.Router({mergeParams:true});

var  Campground= require("../moduls/camp.js");
var Comment=require("../moduls/comment.js");
var middelware=require("../middleware/index.js");

router.get("/new",  middelware.islogedInd, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
			req.flash("error","campground not found");
            console.log(err);
        } else {
             res.render("newComment", {data: campground});
        }
    });
});

router.post("/", middelware.islogedInd,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
		   			req.flash("error","campground not found");

           res.redirect("/campgrounds");
       } else {
		   
        Comment.create(/*req.body.com*/
			{
				author:{
				username:getname(req.user),
				id:req.user
			},
				
				text:req.body.com
			}, function(err, comment){
           if(err){
			   			req.flash("error","something went wrong");
res.redirect("back");
			               console.log(err);

           } else {
               campground.comments.push(comment);
               campground.save();
			   req.flash("success","comment is created successfully");
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

//edit route 
router.get("/:idd/edit",middelware.ownerComeent,function(req,res){

	Comment.findById(req.params.idd,function(err,comm){


		if(err){
			console.log(err);
						   			req.flash("error","something went wrong");

			res.redirect("campgrounds");
		}else{
			res.render("editcom",{com:comm,id:req.params.id});
		}
	});
});

//update route 
router.put("/:idd",middelware.ownerComeent,function(req,res){
	Comment.findByIdAndUpdate(req.params.idd,{
		text:req.body.com
	},function(err,com){
		if(err){
						   			req.flash("error","something went wrong");

			console.log(err);
			res.redirect("/campgrounds/"+req.params.id);
		}else{
			req.flash("success","comment is updated successfully");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
// delete route 
router.delete("/:idd",middelware.ownerComeent,function(req,res){
	Comment.findByIdAndRemove(req.params.idd,function(err){
		if(err){
			console.log(err);
									   			req.flash("error","something went wrong");

			res.redirect("/campgrounds/"+req.params.id);
		}
					req.flash("error","comment is deleted successfully");

					res.redirect("/campgrounds/"+req.params.id);

	});
});

function getname(name){
	if(name==undefined){
		return undefined;
	}
	//include first not the last
	for(var i=0;i<name.username.length;i++){
		if(name.username[i]==='@'){
			return name.username.substring(0,i);
		}
	}
	return name.username;
}



module.exports=router;

var  Campground= require("../moduls/camp.js");
var Comment=require("../moduls/comment.js");

var middlewareObject={};
middlewareObject.ownerComeent=function (req,res,next){
	if(!req.isAuthenticated){
				req.flash("error","You need to be logged in ");

		return res.redirect("/login");
	}
	Comment.findById(req.params.idd,function(err,com){
		if(com.author.id.equals(req.user._id)){
					return next();

		}else{
							req.flash("error","you aren't the owner of the campground");

				return res.redirect("back");

		}
	});
	
};

middlewareObject.ownerCampGround=function(req,res,next){
	if(!req.isAuthenticated()){
		req.flash("error","You need to be logged in ");
		return res.redirect("login");
	}
	Campground.findById(req.params.id,function(err,found){
		if(err){
			req.flash("error","campground not found");
			res.redirect("back");
		}else{
			if(found.createBy.id.equals(req.user._id)){
			     return next();
			   }else{
				req.flash("error","you aren't the owner of the campground");
				res.redirect("back");
			   }
		}
	});
};
middlewareObject.islogedInd=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error","You Need To Be Logged In ");
    res.redirect("/login");
};

module.exports=middlewareObject;
var mongoose=require("mongoose");
var campground=require("./moduls/camp");
var comment=require("./moduls/comment");
var campGround=[
		{ name:"Salmon Creek",image:"https://media-cdn.tripadvisor.com/media/photo-s/11/80/05/25/large-camping-area.jpg" ,description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."},
		{ name:"Granite Hill",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwj2-KBUFStyTsVQ5o-bVOD_cfFiLE0FjO5gvzjw1CJJ_BKRkd",description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." },
		{ name:"Mountain Goot's Rest",image:"https://static.alyaoum24.com/wp-content/uploads/2015/04/%D9%85%D8%B1%D8%B2%D9%88%D9%83%D8%A9-504x362.jpg?x67121" ,description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
	];
function seed(){
	
campground.remove({},function(err){
	if(err){
		console.log(err);
		
	}else{
		
	}
});
/*campground.remove({},function(err){
	if(err){
		console.log(err);
	}else{
		campGround.forEach(function(camp){
		    campground.create(camp,function(err,camp){
				console.log("+++++++++++++++++++++++++++");
				  if(err){
					  console.log(err);
				  }else{
					  comment.create({
						  author:"Ahmed Alzayady",
						  text:"To Do Or To Die"
					  },function(err,com){
						  if(err){
							  console.log(err);
						  }else{
							 // console.log(camp.comments);
							  camp.comments.push(com);
							  camp.save();
								 
						  }
					  });
				  }
			});
		});
	}
});

}*/}
module.exports=seed;


 

 /*User.findOne({email:"ahmedaymen841@yahoo.com"}).populate("posts").exec(function(err,user){
	if(err){
		console.log("Error");
	}else{
		  Post.create({
			  title:"try Hard",
			  content:"And on't Stop"
		  },function(err,post){
			  if(err){
				  console.log("error");
			  }else{
				    user.posts.push(post);
				    user.save(function(err,user){
						 User.findOne({email:"ahmedaymen841@yahoo.com"}).populate("posts").exec(function(err,user){
						if(err){
							console.log(err);
						}else{
								  console.log("DONE");
								  console.log(user);
						}
					}
				);
					});
				   
			  }
		  });
	}
});*/

//module.exports = seedDB;
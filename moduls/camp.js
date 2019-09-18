var mongoose=require("mongoose");
var campGroundSchema= new mongoose.Schema({
	name:String,
	image:String,
	price:String,
	description:String,
	createdAt:{type:Date,default:Date.now},
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"comment"
	}],
	createBy:{
		
	
	id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
		username:String
	}
});
module.exports=mongoose.model("campground",campGroundSchema);
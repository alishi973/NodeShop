let mongoose=require("mongoose")
let schema=mongoose.Schema;



const categorySchema=new schema({
    name:{type:String,default:"No Name"},
    icon:String,
    enable:{type:Boolean,default:true}
})
module.exports = mongoose.model('categories', categorySchema);
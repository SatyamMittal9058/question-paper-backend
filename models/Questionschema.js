const mongoose=require('mongoose');
const questionSchema=new mongoose.Schema({
    question:String,
    subject:String,
    topic:String,
    difficulty:String,
    marks:Number,
})
const quesSchema=mongoose.model('quesSchema',questionSchema);
module.exports=quesSchema;


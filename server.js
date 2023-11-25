const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const QuestionSchema=require("./models/Questionschema");

mongoose.connect(process.env.MONGO_URL);
const database=mongoose.connection;
database.on("connected",()=>{
    console.log("MongoDB connected");
});

const server=express();
server.use(cors());
server.use(bodyParser.json());

server.post('/newquestion',async (req,res)=>{
    console.log(req.body);
    const data=req.body;
    let questiondata=new QuestionSchema(data);
    const doc=await questiondata.save();
    console.log(doc);
    res.json(doc);
});

server.get('/generatepaper',async(req,res)=>{
    const totalmarks=100;
    const easymarks=20;
    const mediummarks=50;
    const hardmarks=30;
    const questions=[];
    const getRandom=async(difficulty,marks) => {
        const ques=await QuestionSchema.find({difficulty}).limit(marks);
        return ques;
    };

    const easyQues=await getRandom('easy',easymarks);
    const mediumQues=await getRandom('medium',mediummarks);
    const hardQues=await getRandom('hard',hardmarks);
    
    questions.push(...easyQues,...mediumQues,...hardQues);
    res.json(questions);


})

server.get('/checkapi',(req,res)=>{
    res.send('api running successfully')
})
server.listen(4000);




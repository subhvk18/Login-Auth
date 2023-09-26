const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Users",{
    // useNewUrlPaeser: true,
    // useUnifiedTopology: true,
    // useCreateindex:true
})
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection= new mongoose.model('Form',logInSchema)
// LogInCollection.save();
module.exports=LogInCollection
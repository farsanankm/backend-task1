import express, { json } from 'express'
import mongoose from 'mongoose'

const app=express()
app.use(express.json());
 
mongoose.connect('mongodb://localhost:27017/task1')
.then(()=>console.log('data base is connected succesfully'))

const taskschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:String
    }

}
)

const task=mongoose.model("task",taskschema)

app.post('/task', async(req,res)=>{
    try {
        let newdata=new task(req.body)
        let data=await newdata.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
)
app.get('/task',async(req,res)=>{
    try {
        let userdata=await task.find()
        res.json(userdata)

    } catch (error) {
        console.log(error);
        
    }
})
app.get('./task/:id',async(req,res)=>{
    try {
        let id=req.params.id 
        let userid=await task.findByIdAndUpdate(id,{name:username},{new :true});
        res.json(userid)
    } catch (error) {
        console.log(error);
    }
})

app.put('/task/:id', async(req,res)=>{
    try {
        let add=req.params.id
        let username=req.body.name
        let useradd=await task.findByIdAndUpdate(id,{name:username},{new:true})
        res.json(useradd)
    } catch (error) {
        console.log(error);
    }
})

app.delete('/task/:id',async(req,res)=>{
    try {
        let id=req.params.id
        let userid=await task.findByIdAndDelete(id,{new:true})
        res.json(userid)
    } catch (error) {
        console.log(error);
    }
})
app.listen(4000,()=>{
    console.log('server is running........');
});
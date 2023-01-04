// Task1: initiate app and run server at 3000
            const express = require("express");
            const bodyParser = require("body-parser");
            const app = new express();
            const mongoose = require("mongoose");
            const { employeeModel } = require("./dist/model/employee");


            

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended:false}));
            
            const path=require('path');
            app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));


// Task2: create mongoDB connection 



            mongoose.connect("mongodb+srv://araj89036:araj89036@cluster0.mcjus29.mongodb.net/employeeDB?retryWrites=true&w=majority",
            {
                useNewUrlParser: true 
            });

 
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

app.get('/',(req,res)=>{
    (err,data)=>{
        if (err){
            res.json({"status":"Error","error":err})
        }else{
            res.json({"status":"welcome","data":data})
        }

    }

});

app.post("/api/employeelist", async (req,res)=>{
  
        const item = req.body;
        const user = new employeeModel(item);
        const User = await user.save();
        res.send(User);
   
})




//TODO: get data from db  using api '/api/employeelist'


// app.post('/api/employeelist',(req,res)=>{

//     employeeModel.find((err,data)=>{
//         if (err){
//         res.json({"status":"Error","error":err})
//     }else{
//         res.json(data)
//     }

//     })
    

// });

app.get("/api/employeelist", async(req,res) =>{

        const data = await employeeModel.find();
        res.send(data);
    
   
})

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employeelist/:id", async(req,res) =>{
  
        const data = await employeeModel.findById(req.params.id);
        res.send(data);
 
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist", async (req,res)=>{
   
        const item = req.body;
        const user = new employeeModel(item);
        const memberUser = await user.save();
        res.send(memberUser);
    
   
})


//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id",async (req,res)=>{
  
        const data = await employeeModel.deleteOne(
            {
                "id":req.params.id
            })
        
        res.send(data);
    
})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',async (req,res)=>{
  
        const data = await employeeModel.findByIdAndUpdate(
            {
                "_id":req.body._id,
            },
            {
                $set : {
                    "name" : req.body.name,
                    "location" : req.body.location,
                    "position" : req.body.position,
                    "salary" : req.body.salary
                }
            }
        );
        
        res.send(data);
    
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
app.listen(3000,()=>{
    console.log("Server started")
});




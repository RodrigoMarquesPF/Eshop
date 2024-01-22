const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit: "10mb"}))

const PORT = process.env.PORT || 8080

//mongodb connection
//npm install dotenv

//console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connect to database"))
.catch(()=>console.log(err))

//schema 
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type:String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
})

//
const userModel = mongoose.model("user",userSchema)


//API
app.get("/", (req,res) => {
    res.send("Server is running")
})
app.post("/signup",async(req, res)=>{
    console.log(req.body)
    const{email} = req.body

    try {
        const result = await userModel.findOne({ email: email });
        console.log(result);
        //console.log(result)
       // console.log(err)
       if (result) {
        res.send({ message: "Email id is already registered",alert:false});
      } else {
        const data = new userModel(req.body);
        const saveResult = await data.save();
        res.send({ message: "Successfully signed up" ,alert:true});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  });
        /*
        if(result){
            res.send({message : "Email id is already register"})
        }else{
            const data = userModel(req.body)
            const save = data.save()
            res.send({message:'Successfully signup'})
        }
        */
    



app.listen(PORT,()=>console.log("Server ir running at port:" + PORT))
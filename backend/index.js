const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
//npm install dotenv

//console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to database"))
  .catch(() => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//API
app.get("/", (req, res) => {
  res.send("Server is running");
});

//signup
app.post("/signup", async (req, res) => {
  //console.log(req.body);
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email: email });
    //console.log(result);
    //console.log(result)
    // console.log(err)
    if (result) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const data = new userModel(req.body);
      const saveResult = await data.save();
      res.send({ message: "Successfully signed up", alert: true });
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

//api login
// API Login
app.post("/login", async (req, res) => {
  //console.log(req.body);
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email: email });

    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({ message: "Login successfully", alert: true, data: dataSend });
    } else {
      res.send({ message: "Invalid email or password", alert: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

//Product section
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", schemaProduct)

//save product in data
//api
app.post("/uploadProduct",async(req,res)=>{
  //console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message:"Upload successfull"})
})


//
app.get("/product",async(req,res)=>{
  const data =await productModel.find({})
  res.send(JSON.stringify(data))
})


//Payment getWay//
console.log(process.env.STRIPE_SECRET_KEY)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/checkout-payment",async(req,res)=>{
  //console.log(req.body)
  
  try {

    const params ={
        submit_type:'pay',
        mode:"payment",
        payment_method_types: ['card'],
        billing_address_collection:"auto",
        shipping_options :[{shipping_rate: "shr_1Oe4IOIHV0s6lmEpFJzvwslM"}],

        line_items: req.body.map((item)=>{
          return{
            price_data :{
              currency: "brl",
              product_data:{
                name: item.name,
                //images :[item.image]
              },
              unit_amount:item.price * 100,
            },
            adjustable_quantity:{
              enabled:true,
              minimum:1,
            },
            quantity: item.qty

          }
        }),
        success_url :`${process.env.FRONTEND_URL}/success`,
        cancel_url:`${process.env.FRONTEND_URL}/cancel`,
    }
  
    const session = await stripe.checkout.sessions.create(params)
    console.log(session)
    res.status(200).json(session.id)
    //res.send({message: "payment gateway", success : true})
  
    
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }
})

//server running
app.listen(PORT, () => console.log("Server ir running at port:" + PORT));

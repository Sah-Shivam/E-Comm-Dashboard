const express = require('express');
const cors = require('cors')
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product")

const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());
app.post("/register", async (req, resp) => {
   
    try{
        let user = new User(req.body);
        let result = await user.save();
            if(result){
                resp.status(201).json(result)
            }
            else {
                resp.status(400).json('Error in signup')
            }
        
    }catch(err){
        resp.status(400).json('error in signup')
    }
})

//line-18 Login API h--> Jb frontend pr "/login" path pr Login ke request ayege tb backend pr same Path pr ye Api cal hogi 
// hhm logIN karke ke time pr email & password dalte h tb ye DB me request jate h aur se match karti h aur detial matched hoti tb
//  respone send karti h aur user logedIN ho jata h 
app.post('/login', async (req, resp) => {
    try{
        if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body);
            if(user){
                resp.status(200).json(user)
                console.log(user)
            }
            else {
                resp.status(400).json('Error in login')
            }
        }
    }catch(err){
        resp.status(400).json('error in login')
    }
    
})

// api for add product 
app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

// api  for product listing
app.get('/products/:id',async (req, resp) => {
    let products = await Product.find({ userId: req.params.id });
    if (products.length > 0) {
        resp.send(products);
    }
    else {
        resp.send({ result: 'No Product found' })
    }
})

//Api for deleting the Product Item
app.delete("/product/:id", async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result);
})

//Api to fetch Single product  
app.get("/product/:id",async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    }
    else {
        resp.send({ result: 'No data found' })
    }
})


app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result)
})


app.get("/search/:key", async (req, resp) => {
    try {
        let result = await Product.find({
            "$or": [
                { name: { $regex: new RegExp(req.params.key, 'i') } },
                { price: { $regex: new RegExp(req.params.key, 'i') } },
                { company: { $regex: new RegExp(req.params.key, 'i') } },
                { category: { $regex: new RegExp(req.params.key, 'i') } }
            ]
        });
        resp.send(result);
    } catch (error) {
        resp.status(500).send({ result: "Internal Server Error" });
    }
});

// function verifyToken(req, resp, next) {
//     let token = req.headers['authorization'];
//     if (token) {
//         token = token.split(' ')[1]; 
//         jwt.verify(token, jwtKey, (err, valid) => {
//             if (err) {
//                 resp.status(401).send({ result: "Please provide a valid token" });
//             } else {
//                 // If the token is valid, you can attach the user information to the request if needed
//                 req.user = valid;
//                 next();
//             }
//         });
//     } else {
//         resp.status(403).send({ result: "Please add the token to the header" });
//     }
// }
app.listen(5000);


//
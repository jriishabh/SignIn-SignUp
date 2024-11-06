//how we handle expection in javascript

const express = require('express')
const app = express()
const port = 3000;
let client;
const cors = require('cors')
app.use(express.json());
app.use(cors());
const {MongoClient} = require("mongodb")

const mongoclient = new MongoClient('mongodb://localhost:27017/');
const dbconnect =async()=>{
  try{
    client = await mongoclient.connect()

      console.log("db connected");
      
  }catch(err){
    console.log(err);
    
  }

}

dbconnect();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/signin',async(req,res)=>{
  const{username,password} = req.body;
  const coll = client.db('appgtbit').collection('signup');
  const cursor = await coll.find({username:req.body.username}) 
  const result = await cursor.toArray();
  if(result.length ==1){ 
  if(username ==result[0].username && password ==result[0].password){
    res.send({ok:1 , msg:"valid user"})
   }
   else{
    res.send({ok:0,msg:"not valid user"})
   }
  }
   else{
    res.send({ok:0,msg:"not valid user"})
   }
})
app.post('/signup',(req,res)=>{
 try {
  const coll = client.db('appgtbit').collection('signup');
  const cursor = coll.insertOne(req.body)
    res.send({ok:1 , msg:"user created"})
 } catch (err) {
  res.send({ok:0 , msg:"user not created , try after some time"})
 }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
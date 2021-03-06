const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l32d5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try{
    await client.connect();
    const serviceCollection = client.db('Server').collection('Student');
    app.get('/student',async(req,res)=>{
    const query = {};
    const cursor = serviceCollection.find(query);
    const services = await cursor.toArray();
    res.send(services);
    })

    app.get('/hero',(req,res)=>{
        res.send('I love You.')
    })

    app.post('/Student',async(req,res)=>{
        const newUser = req.body;
        console.log('adding',newUser);
        const result = await serviceCollection.insertOne(newUser);
        res.send(result);
    });

    app.delete('/student/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        const result = await serviceCollection.deleteOne(query);
        res.send(result);
    });
}
finally{

}
}

run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Hello Lemon');
})

app.listen(port,()=>{
    console.log('Done',port);
})
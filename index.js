const express= require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8000;

const usersData= [
    {
        "name": "testuser",
        "password": "password123"
    },{
        "name": "testuser1",
        "password": "password1234"
    }
]

app.get("/users",(req,res)=>{
    res.status(200).json(usersData);
})

app.post("/signup",(req,res)=>{
    const {name, password} = req.body;
    console.log(name,password)
     const existingUser = usersData.find(user => user.name === name || user.password === password);
     console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    const newUser = {
        name,
        password
    };
    usersData.push(newUser);
    res.status(201).json({ message: 'Account created Successfully'});
})
app.listen(port, ()=>{
    console.log("Server is listening on port ",port);
})
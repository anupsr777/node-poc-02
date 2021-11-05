const express = require('express');
const app = express();
const port = 8081;
const users = require('./api/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs')
app.use(bodyParser.json())
app.use(cors());
app.use(expressJwt({secret:'app_secret_key',algorithms: ['HS256']}).unless({path: ['/api/auth','/api/signup','/']}));

app.post('/api/auth',(req,res) => {
    let request = req.body;
    const user = users.find((user) => request.username == user.username);
    if(!user || user.password != request.password) return res.sendStatus(401);
    let token = jwt.sign({userDetail: {userId:user.id,userName:user.username}}, 'app_secret_key', {expiresIn: '1m'});
    res.send({token});
});

app.get('/',(req,res) => {
    res.send("ok");
});

app.post('/api/signup',async (req,res) => {
    let request = req.body;
    let newUser = {username:request.username, password:request.password};
    let adduser =  await addUser(newUser);
    if(adduser) res.send(true);
    res.send(false);
});

app.listen(port,()=>{
    console.log(`server running on port:${port}`);
});

async function addUser(newUser){
    let userData = users;
    let lastId = (parseInt(userData[userData.length-1].id) + 1).toString();
    let userCred = {
        id:lastId, username:newUser.username, password:newUser.password
    };
    userData.push(userCred)
    fs.writeFileSync('user.json',JSON.stringify(userData),'utf-8',(err) => {
        if(err) return false;
        return true;
    })
}
const express = require('express');
const app = express();
const port = 8081;
const users = require('./api/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors());
app.use(expressJwt({secret:'app_secret_key',algorithms: ['HS256']}).unless({path: ['/api/auth']}));

app.listen(port,()=>{
    console.log(`server running on port:${port}`);
});

app.post('/api/auth',(req,res) => {
    let request = req.body;
    const user = users.find((user) => request.username == user.username);
    if(!user || user.password != request.password) return res.sendStatus(401);
    let token = jwt.sign({userDetail: {userId:user.id,userName:user.username}}, 'app_secret_key', {expiresIn: '1m'});
    res.send({token});
});

app.get('/',(req,res) => {
    res.send("ok");
})

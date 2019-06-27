const express = require('express');
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


 


require('./route.js')(app);

app.get('/', (req, res) => {
    res.json({"message": "student crud api"});
});
app.listen(3000,function(){
    console.log("Server is connected");
});
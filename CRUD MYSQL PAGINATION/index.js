const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const path = require('path');

app.use(bodyParser.json());

const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'student'
});

con.connect(function(err){
    if (err) throw err;
    console.log("Database connected");
});

app.get('/students',function(req,res){
   var pageSize = req.query.pagesize;
   var pageNo = req.query.pageNo;
   var currentPage = pageSize * (pageNo-1) ;
   let sql = "select * from student limit " + currentPage + "," + pageSize ;
    
     con.query(sql,function(err,result){
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.get('/students/:id',function(req,res){
    let sql = "select * from student where id=" +req.params.id;
    let query = con.query(sql,function(err,result){
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.post('/students',function(req,res){
    let data = {id: req.body.id,name: req.body.name, course: req.body.course,place: req.body.place};
    let sql = "insert into student set ?";
    let query = con.query(sql,data,function(err,result){
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.put('/students/:id',function(req,res){
    let sql ="update student set name='"+req.body.name+" ',course='"+req.body.course+" ',place='"+req.body.place+" 'where id=" + req.params.id;
    let query = con.query(sql,function(err,result){
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.delete('/students/:id',function(req,res){
    let sql = "delete from student where id=" +req.params.id +"";
    let query = con.query(sql,function(err,result){
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.listen(3000,function(){
    console.log("Server is connected");
});

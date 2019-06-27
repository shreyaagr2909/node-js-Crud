
var con = require('./databaseConnection.js');
var validation = require('./validation.js');

con.connect(function(err){
    if (err) throw err ;
    console.log("Database connection established");
});

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Student can not be empty"
        });
    }
    else{
        console.log("New student created ");
        let data = {id: req.body.id,name: req.body.name, course: req.body.course,email : req.body.email};
        if(validation.course(req.body.course))
        {
            if(validation.email(req.body.email))
            {
                
                    let sql = "insert into student set ?";
                    con.query(sql,data,function(err,result){
                    if(err) throw err;
                    res.send("New student created");
                    res.send(JSON.stringify(result));
                    });
            }
            else{
                res.send("Invalid email");
            }
        }
        else
        {
            res.send("invalid course");
        }
        
}
};

exports.findAll = (req, res) => {
    var pageSize = req.query.pageSize;
    var pageNo = req.query.pageNo;
    console.log(pageNo);
    console.log(pageSize);
 
    var currentPage = pageSize * (pageNo) ;
    if(pageNo < 0 || pageSize < 0)
    {
        res.send("invalid pageNo or pageSize");
    }
    else
    {
    console.log(currentPage);
    let sql = "select * from student limit " + currentPage + "," + pageSize ;
      let query = con.query(sql,function(err,result){
         if(err) throw err;

         console.log("Student get all");
         res.send(JSON.stringify(result));
     });
     }
};

exports.findOne = (req, res) => {
    let sql = "select * from student where id=" + req.params.id;
    let query = con.query(sql,function(err,result){
        // if(err) throw err;
        console.log("Student get id")
        res.send(JSON.stringify(result));
    });
};

exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "student can not be empty"
        });
    }

    let sql ="update student set name='"+req.body.name+" ',course='"+req.body.course+" ',email='"+req.body.email+" 'where id=" + req.params.id;
    let query = con.query(sql,function(err,result){
        if(err) throw err;
        res.send("Student info updated");
        res.send(JSON.stringify(result));
        console.log("Studnet udated");
    });
};

exports.delete = (req, res) => {
    let sql = "delete from student where id=" +req.params.id +"";
    let query = con.query(sql,function(err,result){
        if(err) throw err;
        res.send("Student info deleted");
        res.send(JSON.stringify(result));
        console.log("Student deleted");
    });
};

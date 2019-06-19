const Stud = require('./student.models.js');

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Student can not be empty"
        });
    }

    const stud = new Stud({
        id: req.body.id , 
       name: req.body.name,
        course: req.body.course,
        place: req.body.place,
        email : req.body.email,
        phone_no : req.body.phone_no,
        gender : req.body.gender
    });

    stud.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message 
        });
    });
};

exports.findAll = (req, res) => {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    console.log(pageNo);
    console.log(size);
    var skips = size * (pageNo - 1);
    console.log(skips);

    Stud.find().skip(skips).limit(size).select(' _id id name course place phone_no').then(stud => {
            res.send(stud);
        }).catch(err => {
            res.status(500).send({
                message: err.message 
            });
        });
// To get the list of all students.
    // Stud.find()
    // .select(' _id id name course place phone_no')
    // .then(stud => {
    //     res.send(stud);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message 
    //     });
    // });
};

exports.findOne = (req, res) => {
    Stud.findById(req.params.id)
    .then(stud => {
        if(!stud) {
            return res.status(404).send({
                message: "student not found "
            });            
        }
        res.send(stud);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found  " 
            });                
        }
        return res.status(500).send({
            message: " wrong student  "
        });
    });
};

exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "student can not be empty"
        });
    }


    Stud.findByIdAndUpdate(req.params.id, {
        id: req.body.id , 
        name: req.body.name,
         course: req.body.course,
         place: req.body.place,
         email : req.body.email,
        phone_no : req.body.phone_no,
        gender : req.body.gender
    }, {new: true})
    .then(stud => {

        if(!stud) {
            return res.status(404).send({
                message: "student not found" 
            });
        }
        res.send(stud);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found  "
            });                
        }
        return res.status(500).send({
            message: " wrong updating " 
        });
    });
};



exports.delete = (req, res) => {
    Stud.findByIdAndRemove(req.params.id)
    .then(stud => {
        if(!stud) {
            return res.status(404).send({
                message: "student not found with id " 
            });
        }
        res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found " 
            });                
        }
        return res.status(500).send({
            message: "Could not delete student" 
        });
    });
};

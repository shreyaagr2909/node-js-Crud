const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema ({
    id : Number,
    name : String,
    course : String
});

const User = mongoose.model('user',userSchema);

module.exports= { User};


const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema({
    id: {
        type : Number,
        unique: true,
        required: true
    },
    name: {
        type : String,
        required : true,
        validate :{ validator : (name) => {
            return /^([a-zA-Z ]{2,30})+$/.test(name);
            }
        }
        },

    course: String,

    place: String,

    email : {
        type : String,
       unique: true,
        required : true,
        validate : {  validator : (email) => {
            return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
        }  
    }},

    phone_no : {
            type : String,
            unique: true,
            validate :{ 
                validator : (phone_no) => {
                return /\d{10}/.test(phone_no);
            }}
    },
    gender : {
        type : String,
        required: true,
        enum: ['F', 'M']
    }
}, {
    timestamps: true
});
Schema.plugin(uniqueValidator);
module.exports = mongoose.model('Students', Schema);
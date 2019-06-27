
var i = 0;
var unique = [];

var validation = {

    course : function(course){
        if((course != "csc") && (course != "ece") && (course != "mech"))
        {
           
            return false;
        }
        else
        {
            return true;
        }
    },
    email :function(email){
        if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)))
        {
           
            return false;
        }
        else
        {
            return true;
        }
    }
}

module.exports = validation;
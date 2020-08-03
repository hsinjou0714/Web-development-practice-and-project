//https://nodejs.org/api/modules.html#modules_the_module_object

//now the module export the getDate, we don't need to call function now
//the function is only passed over 
module.exports.getDate  = function() { //use anonomous function 
    let today = new Date();
    var day = "";

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US", options);
    return day;
}

module.exports.getDay = getDay //return a different format of day
//another way, use declair function 

function getDay() {
    let today = new Date();
    var day = "";

    var options = {
        weekday: "long",
    }

    var day = today.toLocaleDateString("en-US", options);
    return day;
}

console.log(module.exports)


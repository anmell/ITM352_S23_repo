
/* the function below evaluates the array elements of the variable "pieces" 
and outputs an array according to whether the retrunError ternanry expression is true or not. */
function stringNegativeIntegerEval(part, returnErrors) {
    errors = []; // assume no errors at first
   if(Number(part) != part) errors.push('Not a number!'); // Check if string is a number value
    if(part < 0) errors.push('Negative value!'); // Check if it is non-negative
   if(parseInt(part) != part) errors.push('Not an integer!'); // Check that it is an integer

    var returnErrors = returnErrors ? errors : (errors.length == 0);
    return (returnErrors);
    
}

var attributes  =  "Alanna;20;20.5;-19.5"; 
var pieces = attributes.split(";");

for (let part of pieces) {
    console.log (part, stringNegativeIntegerEval(part));
}

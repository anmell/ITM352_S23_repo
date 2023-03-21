var total = 175;
var quarters = 25;
var dimes = 10;
var nickels = 5;
var pennies = 1; 

var q = parseInt(total/quarters);
var d = parseInt(q/dimes);
var n = (parseInt (total % quarters)%dimes)/nickels;
var p = ((parseInt (total % quarters)%dimes)%nickels);

console.log (`there will be ${q} quarters, ${d} dimes, ${n} nickes, and ${p} pennies`)
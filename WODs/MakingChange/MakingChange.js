// Given any total ampount of pennies, solve for the least amount of coins it can be converted to
// 1. assign the total to a variable 
// 2. quarters: divide the total by 25, keep only the integer
// 3. dimes: take the remainder from step 2, divide by 10, keep only the integer
// 4. nickels: take the remainder from step 3, divide by 5, keep only the integer
// 5. pennies: take the remainder from step 4

var total = 175; 

var q = parseInt(total/25);
var d = parseInt((total%25)/10);
var n = parseInt(((total%25)%10)/5);
var p = (((total%25)%10)%5)

console.log (`The smallest amount of coins that ${total} cents can be broken down to is ${q} quarters, ${d} dimes, ${n} nickels, and ${p} pennies`)
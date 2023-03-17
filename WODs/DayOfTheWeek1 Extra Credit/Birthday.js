// My Birthday is March 30, 2002 and it was a Saturday
// 1. create object to store birthday data
var myBirthday = {
    day: 30, 
    month: 'March',
    year: 2002
};

// 2. create array to store the days of the week
var daysOfWeek = [
"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

// 3. create object to store month key
var monthkey = {
    "January": 0,
    "February": 3,
    "March": 2,
    "April": 5,
    "May": 0,
    "June":	3,
    "July": 5,
   "August": 1,
    "September": 4,
    "October": 6,
    "November":	2,
    "December": 4
};

// 4. create a ternary operator for step1 
var step1 = (myBirthday.month == "January" || myBirthday.month == "February") ? myBirthday.year - 1: myBirthday.year;

// 5. compute steps 2-7 in a single equation 
var steps = (((((parseInt(step1/4) + step1) - (parseInt(step1/100))) + (parseInt(step1/400))) + myBirthday.day) + monthkey[myBirthday.month]) % 7;

// 6. convert numeric value to its associated day of the week according to the days of week array
var dow = daysOfWeek[steps];

console.log (`${myBirthday.month} ${myBirthday.day} ${myBirthday.year} was a ${dow}`)
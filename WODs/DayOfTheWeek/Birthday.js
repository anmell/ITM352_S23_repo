// My Birthday is March 30, 2002

// Define day, month year
var myBirthday = {
    day: 30,
    month: "March",
    year: 2002
}

// Array defining the days of the week
var daysOfWeek = [
   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

// Function defining the month-key
function monthKey(myBirthday) {
switch (myBirthday[month]) {
case "January": 
    myBirthday[month] = 0;
    break;
case "February": 
    myBirthday[month] = 3;
    break;
case "March": 
    myBirthday[month] = 2;
    break;
case "April": 
    myBirthday[month] = 5;
    break;
case "May": 
    myBirthday[month] = 0;
    break;
case "June": 
    myBirthday[month] = 3;
    break;
case "July": 
    myBirthday[month] = 5;
    break;
case "August": 
    myBirthday[month] = 1;
    break;
case "September": 
    myBirthday[month] = 4;
    break;
case "October": 
    myBirthday[month] = 6;
    break;
case "November": 
    myBirthday[month] = 2;
    break;
case "December": 
    myBirthday[month] = 4;
    break;
};
return (myBirthday[month]);
};



// 1: Create an If statement: if jan or feb, then continue; else...
// 2: divide by 4, use partInt() to add the integer to above value
function Birthday (myBirthday, daysOfWeek){
if (myBirthday[month] === "January" || myBirthday[month] === "February"){
    myBirthday[year] = myBirthday[year] - 1;
}else{
    myBirthday[year] = myBirthday[year]
};
//value assigned to myBirthday[year]: 2002

var step2 = parseInt(myBirthday[year]/4) + myBirthday[year];
//value returned 2502

var step3 = step2 - (parseInt(myBirthday[year]/100));
//value returned 2482

var step4 = parseInt(myBirthday[year]/400) + step3;
// value returned 2487

var step5 = myBirthday[day] + step4;
// value returned 2517

var step6 = monthKey(myBirthday) +step5;
// value returned 2519

var step7 = step6 % 7;
// value returned 6

step8 = daysOfWeek.step7;
return(step8);
};


console.log (Birthday(myBirthday))
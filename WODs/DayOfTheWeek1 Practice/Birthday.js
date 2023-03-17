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

var monthKey = {
    "January": 0,
    "February": 3,
    "March": 2,
    "April": 5,
    "May": 0,
    "June": 3,
    "July": 5,
    "August": 1,
    "September": 4,
    "October": 6,
    "November": 2,
    "December": 4
};
    var y = (myBirthday.month === "January" || myBirthday.month === "February") ? myBirthday.year - 1 : myBirthday.year;

    var dow = (((parseInt(y / 4) + y) - parseInt(y / 100) + parseInt(y / 400) + myBirthday.day + monthKey[myBirthday.month]) % 7);

    var weekday = daysOfWeek[dow];

console.log(`${myBirthday.month} ${myBirthday.day} ${myBirthday.year} was a ${weekday}.`)
var month = "March";
var day = 30;
var year = 2002; 

step1 = 02;
step2 = parseInt(step1/4);
step3 = step1+step2;
step4 = 3;
step6 = step4 + step3;
step7 = day + step6;
step8 = step7;
step9= step8 - 1;
step10 = step9 % 7;

console.log (step10);
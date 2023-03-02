var attributes  =  "Alanna;20;20.5;-19.5"; 
var pieces = attributes.split(";");

for (let i in pieces) {
    console.log (pieces[i], typeof pieces[i]);
}

console.log(pieces.join(','));
// This function asks the server for a "service" and converts the response to text. 
function loadJSON(service, callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', service, false);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function nav_bar(this_product_key, product_data) {
    // This makes a navigation bar to other product pages
    for (let products_key in product_data) {
        if (products_key == this_product_key) continue;
        document.write(`<a href='./display_products.html?products_key=${products_key}'>${products_key}<a>&nbsp&nbsp&nbsp;`);
    }
}
var monthly_sales = [350, 100, 25, 600];
var tax_rate = 0.04;

function calculateTaxesOwed(sales, tax){
    var tax_owing = [];

}

function calculateTaxesOwed(sales, tax){
    var tax_owing = [];
    for (var i = 0; i < sales.length; i++) {
        tax_owing.push(sales[i]*tax);
    }
    return tax_owing;
}

var tax_owing = calculateTaxesOwed(monthly_sales, tax_rate);
console.log(tax_owing);
require("dotenv").config();
const keys = require("./keys")
const mysql = require("mysql")
const inquirer = require("inquirer")
const chalk = require("chalk")
var tracker = true

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    password: keys.password.id,
    database: 'bamazonDB',
    user: 'root'
})

connection.connect(function(err) {
    console.log(chalk.cyan("\nSelecting all products...\n"));
    connection.query("SELECT * FROM products", function(err, res) {
    
      if (err) throw err;

      console.log(chalk.bgBlue.white.underline.bold("  Product ID#  |   Product Name   |   Department Name   |   Price   |   Quantity in Stock   "))

      for (i = 0; i < res.length; i++) {
        var idStr = res[i].item_id.toString()
        var idSpace = ' '.repeat(7-(idStr).length);


        var nameSpace = ' '.repeat((19-(res[i].product_name).length)/2);
        if ((res[i].product_name) % 2 !== 0) {
            var nameSpace2 = ' '.repeat((18-(res[i].product_name).length)/2) 
        }
        else {
            var nameSpace2 = nameSpace
        }


        var departmentSpace = ' '.repeat((21-(res[i].department_name).length)/2);
        if ((res[i].department_name) % 2 !== 0) {
            var departmentSpace2 = ' '.repeat((22-(res[i].department_name).length)/2) 
        }
        else {
            var departmentSpace2 = departmentSpace
        }



        var priceSpace = ' '.repeat((11-(res[i].price.toString().length))/2);
        if ((res[i].price.toString().length) % 2 === 0) {
            var priceSpace2= ' '.repeat((12-(res[i].price.toString().length))/2) 
        }
        else {
            var priceSpace2 = priceSpace
        }
        
        var stockSpace = ' '.repeat((23-(res[i].stock_quantity.toString().length))/2);
        if ((res[i].stock_quantity.toString().length) % 2 === 0) {
            var stockSpace2= ' '.repeat((24-(res[i].stock_quantity.toString().length))/2) 
        }
        else {
            var stockSpace2 = stockSpace
        }



        if (tracker === false) {
            console.log(chalk.bgCyan.white("       " + res[i].item_id + "." + idSpace + "|" + nameSpace + res[i].product_name + nameSpace2 + "|" + departmentSpace + res[i].department_name + departmentSpace2+ "|" + priceSpace + res[i].price + priceSpace2 + "|" + stockSpace + res[i].stock_quantity + stockSpace2));
            tracker = true
        }
        else {
            console.log(chalk.bgWhiteBright.cyan("       " + res[i].item_id + "." + idSpace + "|" + nameSpace + res[i].product_name + nameSpace2 + "|" + departmentSpace + res[i].department_name + departmentSpace2+ "|" + priceSpace + res[i].price + priceSpace2 + "|" + stockSpace + res[i].stock_quantity + stockSpace2));
            tracker = false
        }

      }
      console.log()
      purchaseRequest()
    });
})

function purchaseRequest() {
    connection.query("SELECT * FROM products", function(err, res) {

        if (err) throw err;

        inquirer
        .prompt([
            {
            name: "purchase",
            type: "input",
            message: chalk.cyan.bold("What would you like to purchase? (Enter the name or ID of the product)")
            },
            {
            name: "quantity",
            type: "input",
            message: chalk.cyan.bold("How many would you like to purchase")
            }
        ])
        .then(function(answer) {
            var productChoice = answer.purchase.toUpperCase()

            var numberPurchased = answer.quantity

            for (i = 0; i < res.length; i++) {
                if ((productChoice === res[i].product_name || productChoice == res[i].item_id) && res[i].stock_quantity < numberPurchased) {
                    console.log(chalk.bgRed.white("\nWe don't have enough in inventory to fulfill your order!"))
                    break;
                }
                else if ((productChoice === res[i].product_name || productChoice == res[i].item_id) && res[i].stock_quantity >= numberPurchased) {
                    console.log(chalk.cyanBright("\nYour purchase of " + answer.quantity + " " + res[i].product_name + "S"))
                    console.log(chalk.cyanBright("Comes to a total of $" + (res[i].price * answer.quantity).toFixed(2)))
                    var itemChosen = parseFloat(res[i].item_id)
                    var sales = res[i].price * answer.quantity
                    updateDatabase(numberPurchased, itemChosen, sales)
                    break
                }
                else if (i === (res.length - 1)) {
                    console.log(chalk.bgRed.white("\nWe don't have the item you're looking for in stock! (Or you mistyped!)"))
                    break;
                }
            }
            connection.end();
        });
    });
}


function updateDatabase(numberPurchased, itemChosen, sales) {
    connection.query("update products set stock_quantity =(stock_quantity -" + numberPurchased + "), product_sales=(product_sales +" + sales + ") where item_id =" + itemChosen, function(err){
        if (err) throw err;
    }) 
 
}

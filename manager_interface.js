require("dotenv").config();
const keys = require("./keys")
const mysql = require("mysql")
const inquirer = require("inquirer")
const chalk = require("chalk")
var tracker = true
var choices = []

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    password: keys.password.id,
    database: 'bamazonDB',
    user: 'root'
})


inquirer
.prompt(
    {
    name: "choice",
    type: "rawlist",
    choices: [chalk.cyan("View Products for Sale"), chalk.cyan("View Low Inventory"), chalk.cyan("Add to Inventory"), chalk.cyan("Add New Product"), chalk.cyan("Exit")],
    message: chalk.cyan.bold("\nWhat would you like to do?")
    },
)
.then(function(answer) {
    switch (answer.choice) {
        case chalk.cyan("View Products for Sale"):
            showProducts();
            break;
    
        case chalk.cyan("View Low Inventory"):
            lowInventory();
            break;

        case chalk.cyan("Add to Inventory"):
            addInventory();
            break;

        case chalk.cyan("Add New Product"):
            addProduct();
            break;
    
        case chalk.cyan("Exit"):
            connection.end();
            break;
    }
});

function lowInventory() {
    connection.connect(function(err) {
        if (err) throw err;
        console.log(chalk.cyan("\nLoading all products...\n"));
        connection.query("SELECT * FROM products", function(err, res) {
        
            if (err) throw err;
    
            console.log(chalk.bgBlue.white.underline.bold("  Product ID#  |   Product Name   |   Department Name   |   Price   |   Quantity in Stock   "))
    
            for (i = 0; i < res.length; i++) {

                if (res[i].stock_quantity < 100) {  
                
                var idStr = res[0].item_id.toString()
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
        
            }
        });
        connection.end()
    })
}

function showProducts() {
    connection.connect(function(err) {
        console.log(chalk.cyan("\nShowing all products...\n"));
        connection.query("SELECT * FROM products", function(err, res) {
        
          if (err) throw err;
    
          console.log(chalk.bgBlue.white.underline.bold("  Product ID#  |   Product Name   |   Department Name   |   Price   |   Quantity in Stock   "))
    
          for (i = 0; i < res.length; i++) {
            var idStr = res[0].item_id.toString()
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
        });
        connection.end()
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {

        inquirer
        .prompt([
            {
            name: "name",
            type: "input",
            message: chalk.cyan.bold("\nEnter the ID of the product you would like to add to")
            },
            {
            name: "amount",
            type: "input",
            message: chalk.cyan.bold("\nEnter the amount of product to be added to inventory")
            },
        ])
        .then(function(answer) {
            var productChoice = answer.name.toUpperCase()

            var numberPurchased = answer.amount

            updateDatabase(numberPurchased, productChoice)

            showProducts()
        });
    })
}

function addProduct() {
    listDepartments()
    connection.query("SELECT * FROM products", function(err, res) {

        inquirer
        .prompt([
            {
            name: "name",
            type: "input",
            message: chalk.cyan.bold("\nEnter the new product")
            },
            {
            name: "department",
            type: "rawlist",
            choices: choices,
            message: chalk.cyan.bold("\Choose the department")
            },
            {
            name: "price",
            type: "input",
            message: chalk.cyan.bold("\Enter the price")
            },
            {
            name: "stock",
            type: "input",
            message: chalk.cyan.bold("\Enter the amount in stock")
            }
        ])
        .then(function(answer) {
            var productChoice = answer.name.toUpperCase()
            var department = answer.department
            var price = answer.price
            var stock = answer.stock

            addNewProduct(productChoice, department, price, stock)

            showProducts()
        });
    })
}

function updateDatabase(numberPurchased, productChoice) {

    connection.query("update products set stock_quantity =(stock_quantity +" + numberPurchased + ") where item_id =" + productChoice, function(err){
        if (err) throw err;
    }) 
}

function addNewProduct (productChoice, department, price, stock) {
    connection.query("insert into products (product_name, department_name, price, stock_quantity)values("+"'"+productChoice+"'"+", "+"'"+department+"'"+","+price+","+stock+")", function(err){
    if (err) throw err;
    }) 
}


function listDepartments() { 
    
    connection.query("SELECT department_name FROM departments GROUP BY department_name", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            choices.push(res[i].department_name)
          }
    })
}
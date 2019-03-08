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


choices()

function choices() {
    inquirer
    .prompt(
        {
        name: "choice",
        type: "rawlist",
        choices: [chalk.cyan("View Product Sales by Department"), chalk.cyan("Create New Department"), chalk.cyan("Exit")],
        message: chalk.cyan.bold("\nWhat would you like to do?")
        },
    )
    .then(function(answer) {
        switch (answer.choice) {
            case chalk.cyan("View Product Sales by Department"):
                viewSales();
                break;
        
            case chalk.cyan("Create New Department"):
                createDepartment();
                break;

            case chalk.cyan("Exit"):
                connection.end();
                break;
        }
    });
}

function viewSales () {
    connection.connect(function(err) {
        if (err) throw err;
        console.log(chalk.cyan("\nLoading all products...\n"));
        connection.query("SELECT SUM(product_sales) AS sum_name, overhead_costs, department_id, departments.department_name FROM products INNER JOIN departments ON departments.department_name=products.department_name GROUP BY department_name;", function(err, res) {
        
            if (err) throw err;
            
            console.log(chalk.bgBlue.white.underline.bold("   Department ID#   |   Department Name   |   Overhead Costs   |   Product Sales   |   Total Profit   "))
            
            for (i = 0; i < res.length; i++) {
                var departmentStr = res[i].department_id.toString()
                var departmentSpace = ' '.repeat(9-(departmentStr).length);
        
        
                var nameSpace = ' '.repeat((21-(res[i].department_name).length)/2);
                if ((res[i].product_name) % 2 !== 0) {
                    var nameSpace2 = ' '.repeat((22-(res[i].department_name).length)/2) 
                }
                else {
                    var nameSpace2 = nameSpace
                }


                var overHeadStr = res[i].overhead_costs.toString()
                var overheadSpace = ' '.repeat((20-(overHeadStr).length)/2);
                if ((overHeadStr.length) % 2 !== 0) {
                    var overheadSpace2 = ' '.repeat((19-(overHeadStr).length)/2) 
                }
                else {
                    var overheadSpace2 = overheadSpace
                }


                var productStr = res[i].sum_name.toFixed(2)
                productStr = productStr.toString()
                var productSpace = ' '.repeat((19-(productStr).length)/2);
                if ((productStr.length) % 2 === 0) {
                    var productSpace2 = ' '.repeat((20-(productStr).length)/2) 
                }
                else {
                    var productSpace2 = productSpace
                }
        

                var profits = res[i].sum_name - res[i].overhead_costs
                profits = profits.toFixed(2)
                var profitStr = profits.toString()
                var profitSpace = ' '.repeat((18-(profitStr).length)/2);
                if ((profitStr.length) % 2 !== 0) {
                    var profitSpace2 = ' '.repeat((19-(profitStr).length)/2) 
                }
                else {
                    var profitSpace2 = profitSpace
                }


                if (tracker === false) {
                    console.log(chalk.bgCyan.white("          " + res[i].department_id + "." + departmentSpace + "|" +nameSpace + res[i].department_name + nameSpace2 + "|" + overheadSpace + res[i].overhead_costs +  overheadSpace2 + "|" + productSpace + res[i].sum_name.toFixed(2) + productSpace2+ "|"+ profitSpace + profits + profitSpace2));
                    tracker = true
                }
                else {
                    console.log(chalk.bgWhite.cyan("          " + res[i].department_id + "." + departmentSpace + "|" +nameSpace + res[i].department_name + nameSpace2 + "|" + overheadSpace + res[i].overhead_costs +  overheadSpace2 + "|" + productSpace + res[i].sum_name.toFixed(2) + productSpace2+ "|"+ profitSpace + profits + profitSpace2));
                    tracker = false
                }
                if (i === (res.length-1)) {
                    console.log("")
                    choices()
                }
            }
        });
    })
}

function createDepartment () {
    console.log("New Department")
}
# Inventory Management Simulator


## Description

An application run in the terminal that uses a MySQL database to track the inventory of a store. The application comes with three main parts simulating customer purchases, managing stock, and viewing sales and departments.

## Formatting

Examples of how use each part of the application

1. To simulate a customer purchase
   * Enter "node customer_interface.js" into the terminal as highlighted in yellow below
   * The first query asks the user to select the item they wish to purchase using the name or ID as highlighted in green below
   * The second query asks the user to select the number of that item they wish to purchase
   * After a successful purchase the cost is calculated and displayed and the inventory is adjusted as highlighted in red below
   ![Screenshot](Images/Customer-Interface.png)
   * If the user picks an item that is not in stock this will be the response
   ![Screenshot](Images/not-in-stock.png)
   * If the user tries to order more of an item than is currently in inventory this will be the response
   ![Screenshot](Images/not-enough-inventory.png)
   


## Preview


## Notes

This application requires node.js and MySQL to run. Your MySQL key should be included in a .env file as shown below

  * password='mypassword'

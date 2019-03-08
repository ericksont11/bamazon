# Inventory Management Simulator

## Description

An application run in the terminal that uses a MySQL database to track the inventory of a store. The application comes with three main parts simulating customer purchases, managing inventory, and viewing sales and departments.

## Examples of how use each part of the application

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
   
   
 2. To simulate managing inventory
    * Enter "node manager_interface.js" and you will be shown the following options
    ![Screenshot](Images/manager-interface.png)
    * The first option allows you to see your inventory
    ![Screenshot](Images/view-inventory.png)
    * The second option allows you to see your inventory that is running low ( >25 units)
      While the third option allows you to restock your inventory 
    ![Screenshot](Images/low-add-inventory.png)
    * The fourth option allows you to add new items to your inventory
    ![Screenshot](Images/add-product.png)
    
 3. To simulate the supervisor role (managing sales and departments)
    * Enter "node supervisor_interface.js" and you will be shown the following options
    ![Screenshot](Images/supervisor_interface.png)
    * The first option allows you to view your sales
    ![Screenshot](Images/view-sales.png)
    * The second option allows you to see your add a department
    * Once you add a new department you can add items to it using to manager_interface and view its sales
    ![Screenshot](Images/add-department.png)

## Preview


## Notes

This application requires node.js and MySQL to run. Your MySQL key should be included in a .env file as shown below

  * password='mypassword'
  
## Technologies Used
   
   * MySql
   * Node.js
   * Javascript
   

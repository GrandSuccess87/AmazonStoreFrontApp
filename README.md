# AmazonStoreFrontApp

This command line interface (CLI) application is an Amazon-like storefront application that will take in orders from customers and deplete stock from the store's inventory using MySQL and Node.Js.  This application uses MySQL and Inquirer NPM packages for data input and storage. 

Running this application will display a list of all the products available for sale along with their cost.  The application will prompt you with two messages regarding the product you want to order.  Select the item and the quantity you want to purchase.  

The amount of inventory will be verified and if there isn't enough inventory, then you will be notified. Otherwise, if there is sufficient inventory, your request will be fulfilled.  The total cost of your purchase will appear and the inventory will be updated in the mysql database to reflect the remaining quantity. 

There is also a manager interface that will allow you to View Products for Sale, View Low Inventory, Add to Inventory, and Add New Products to the database.  

To get started, simply follow these steps:
1. Run `npm install` to install node packages/dependencies
2. Run `node bamazonCustomer.js` to interact with the customer interface
3. Run `node bamazonManager.js` to interact with the manager interface 

// Create a new Node application called bamazonManager.js. Running this application will:



var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "1234",
    database: "bamazon_db"
  });
  
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runSearch();
    
  })
// List a set of menu options:

// View Products for Sale
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

function runSearch() {

    //use inquirer to prompt the question and available options
        inquirer
          .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
              "View Products for Sale",
              "View Low Inventory",
              "Add to Inventory",
              "Add New Product",
            ]
          })
          .then(function(answer) {
            switch (answer.action) {
              case "View Products for Sale":
                viewProducts();
                break;
      
              case "View Low Inventory":
                viewLowInventory();
                break;
      
              case "Add to Inventory":
                addToInventory();
                break;
      
              case "Add New Product":
                addNewProduct();
                break;
      
            }
          });  
}

function viewProducts() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
        var query = "SELECT * FROM products";
        connection.query(query, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Listed are the available products for sale: ");
          }
          runSearch();
        });
    //   });
  }




// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
  

// CREATE VIEW [Products for Sale] AS
// SELECT item_id, product_name, department_name, customer_price, stock_quantity
// FROM products

// CREATE VIEW [Low Inventory] AS
// SELECT stock_quantity
// FROM products
// WHERE stockS_quantity < 5;

// CREATE VIEW [Current Product List] AS
// SELECT ProductID, ProductName
// FROM Products
// WHERE Discontinued = No;

// SELECT * FROM [Current Product List];
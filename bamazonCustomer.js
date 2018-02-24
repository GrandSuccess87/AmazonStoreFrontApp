var mysql = require("mysql");
var inquirer = require("inquirer");

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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // createProduct();
    // afterConnection();
    promptCustomer();
  });

  function promptCustomer() {
    inquirer
      .prompt({
        name: "ProductID",
        type: "input",
        message: "What is the item ID of the product you are searching for?",
       
      })
      .then(function(answer) {

    inquirer
        .prompt ({
          name: "ProductUnits",
          type: "input",
          message: "How many units of the Item would you like to buy?",
         
        })
        // based on their answer, either call the check if item is in stock function 
        if (answer.ProductID === "item_id") {
        //   checkForItem();
        }
        else {
        //   console.log("Sorry, We Are Out Of That Item");
        }
      });
  }
function createProduct() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        ProductName: "Rocky Road",
        ProductDepartment: "Ice-Cream",
        CustomerPrice: 10,
        StockQuantity: 50
      },
      function(err, res) {
        console.log(res + " product inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        // updateProduct();
      }
    );
    console.log(query.sql);
}

  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }




//   function afterConnection() {
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw err;
//       console.log(res);
//       connection.end();
//     });
//   }
  
  

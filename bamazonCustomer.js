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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //database query to pull all products and display them
    //call promptCustomer
    readProducts()
  })
  

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
        // based on their answer, validate the item id and quanity then
        //then call the check if item is in stock function 
        //update stock quantity
        if (answer.ProductID === "item_id") {
        //   checkForItem();
        }
        else {
        //   console.log("Sorry, We Are Out Of That Item");
        }
      });
  }
function updateProduct() {
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

        // updateProduct();

}

async function readProducts() {
  console.log("Selecting all products...\n");
  await connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    var t = new Table;
    res.forEach(element => {
      t.cell("productID", element.item_id)
      t.cell("productName", element.product_name)
      t.cell("deptName", element.department_name)
      t.cell("custPrice", element.customer_price)
      t.cell("stockQuantity", element.stock_quantity)
      
      t.newRow()
      
    });
    console.log(t.toString());
    promptCustomer(res)
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
  
  

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
  //database query to pull all products and display them
  //call promptCustomer
  readProducts()
})


function promptCustomer(res) {
  inquirer
    .prompt([{
        name: "ProductID",
        type: "input",
        message: "What is the item ID of the product you are searching for?",
        validate: function (value) {
          if (isNaN(value) === false) {
            // Determines if input value is not a number or is a number with a default of false
            return true;
            console.log("Please enter in a numeric value for the item ID.")
            
            
          }
          return false;
        }
      },
      {
        name: "ProductUnits",
        type: "input",
        message: "How many units of the Item would you like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            // Determines if input value is not a number or is a number
            return true;
            console.log("Please enter in a numeric value for the quanity you would like.")
          }
          return false;
        }

      }
    ])
    .then(function (answer) {
      console.log(answer);
      // console.log your data when testing
      // if (res.includes(answer.name){
      //check w3schoold array methods for best use (indexOf etc)
      // then allow you to the next question, else, redeisplay question
      // (copy and paste next inquirer inside the successful if_)

    });
  }

  // based on their answer, validate the item id and quanity then
  //then call the check if item is in stock function 
  //update stock quantity

  // if (answer.ProductID === ) {
  // //   checkForItem();
  // }
  // else {
  // //   console.log("Sorry, We Are Out Of That Item");
  // }
  // });

  function updateProduct() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
      "INSERT INTO products SET ?", {
        ProductName: "Rocky Road",
        ProductDepartment: "Ice-Cream",
        CustomerPrice: 10,
        StockQuantity: 50
      },
      function (err, res) {
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
    await connection.query("SELECT * FROM products", function (err, res) {
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




  

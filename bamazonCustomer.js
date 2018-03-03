var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

var express = require("express");
// var bodyParser = require("body-parser");
// var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 3307;

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

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


function userInputId(res) {
  inquirer
    .prompt({
      name: "productID",
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
     
    })
    .then(function (answer) {
      // console.log(answer);
      var query = "SELECT * FROM products";
      connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          // console.log(typeof res[i].item_id);
          // console.log(typeof answer.productID);
          if (res[i].item_id === parseInt(answer.productID)) {

            userInputQuantity(answer.productID);

          }
        }
      });
    })
};


// set up getUnitQuanity the exact same way as prompt user
function userInputQuantity(userInputID) {
  // console.log("userInputQuantity");
  inquirer
    .prompt({
      name: "ProductUnits",
      type: "input",
      message: "How many would you like to buy?",
      validate: function (value) {
        if (isNaN(value) === false) {
          // Determines if input value is not a number or is a number
          return true;
          console.log("Please enter in a numeric value for the quanity you would like.")
        }
        return false;
      }

    })
    .then(function (answer) {
      // console.log(answer);
      //SELECT statement to pull data from user input for itemID
      var query = 'SELECT * FROM products WHERE item_id=' + userInputID;
      connection.query(query, function (err, res) {
        // console.log(res);
        if (err) throw err;
        // for loop through data in the row that matches the item id column for stock quantity
        for (var i = 0; i < res.length; i++) {
          if (res[i].stock_quantity < answer.ProductUnits) {

            // if database's quantity is less than input quantity display price, update database
            console.log("Insufficient Quantity. We Have " + res[i].stock_quantity + " Available in Stock. Please try again.");
            console.log()
            userInputQuantity();
          } else {

            // if input quantity is less than database's display price, update database
            if (answer.ProductUnits <= res[i].stock_quantity) {


              //calculate total price for customer 
              var totalPrice = res[i].customer_price * answer.ProductUnits;
              console.log("Your total cost is: " + totalPrice);

              // update product database with the new quantity using the UPDATE statement
              connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: (res[i].stock_quantity - answer.ProductUnits)
                  },
                  {
                    item_id: (userInputID)
                  }
                ],
                function (err, res) {
                  if (err) throw err;
                  // var newQuantity = res[i].stock_quantity - answer.ProductUnits;
                  // console.log(newQuantity);
                  console.log("Your Order Has Been Completed Successfully!!");
                  //inquire if user would like to purchase another item
                  inquirer.prompt([
                    {
                        name: "yesNo",
                        type: "rawlist",
                        message: "Would you like to make another purchase?",
                        choices: ["Y", "N"]
                    }])
                    .then(function(response) {
                        if (response.yesNo == "Y"){
                          readProducts();
                        } else {
                                console.log("Thank you for your order!")
                            } 
                        });   
                })
            }
          }
        }
      })
    })
}


  async function readProducts(res) {
    console.log("readProducts");
    console.log("Selecting all products...\n");
    await connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for(var i = 0; i<res.length; i++){
        // console.log("Product ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].customer_price + " | " + "Quantity: " + res[i].stock_quantity);
        // console.log('--------------------------------------------------------------------------------------------------')
    }
      // console.log(res);
      //create a new table using a javascript constructor and a for each loop that will
      //loop through each row and print the corresponding data. 
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
      userInputId(res)
      // connection.end();
    });
  }

 
  
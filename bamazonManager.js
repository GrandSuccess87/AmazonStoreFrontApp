// Create a new Node application called bamazonManager.js. Running this application will:
// List a set of menu options:
// View Products for Sale
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

// VARIABLES NEEDED
var query;
var inputID;
var newQuantity;

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
    // showProducts()
    managerView();
    
  })

function managerView() {

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
              "Exit"
            ]
          })
          .then(function (answer) {
            // console.log(answer);
            switch (answer.action) {
                case "View Products for Sale":
            // console.log(answer.action);
                 query = "SELECT * FROM products ORDER BY department_name";   
            // console.log(query);
                showProducts(query);

                setTimeout(function() {
                    
                    managerView();

               }, 5000);
                break;
              
            case "View Low Inventory":
             query = "SELECT * FROM products WHERE stock_quantity < 10 ORDER BY department_name";
            console.log(query);
            showProducts(query);
            setTimeout(function() {
                
                managerView();

           }, 3000);
            break;

      
              case "Add to Inventory":
              query = 'UPDATE products SET stock_quantity =' + newQuantity + 'WHERE item_ID = ' + inputID;
              addInventory(query);
              setTimeout(function() {
                
                managerView();

           }, 10000);
              break;
      
            //   case "Add New Product":
            //     addNewProduct();
            //     break;
      
            }
          });  
}
    


   function showProducts(query) {
    console.log("showProducts");
    
    console.log("Selecting all products...\n");
     connection.query(query, function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for(var i = 0; i<res.length; i++){
        // console.log("Product ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].customer_price + " | " + "Quantity: " + res[i].stock_quantity);
        // console.log('--------------------------------------------------------------------------------------------------')
    }
    //   console.log(res);
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
    //   managerView();
      
    });
    
  }

  function addInventory (query) {

    inquirer
    .prompt([{
      name: "id",
      type: "input",
      message: "Please enter the id of the product you would like to restock.",
  },
  {  name: "quantity",
    type: "input",
    message: "Please enter how much you would like to add.",

  }
])
  .then (function(answer) {
    // console.log(answer.id);
    console.log(typeof answer.id);
    // console.log(answer.quantity);
    console.log(typeof answer.quantity);
    inputID = parseInt(answer.id);    
    newQuantity = parseInt(answer.quantity);
    console.log("Inventory successfully added!!");
  })
}

  function addNewProduct () {
    inquirer
    .prompt({
      name: "Inv",
      type: "input",
      message: "What product would you like to update?",
  })
  .then (function(answer) {

  })
}


  
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
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
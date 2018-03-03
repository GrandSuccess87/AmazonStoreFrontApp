var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

// VARIABLES NEEDED
var query;
var inputID;
var newQuantity;

//NEW PRODUCT VARIABLES
var newProductID;
var newProductName;
var newProductDpt;
var newProductPrice;

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
    managerView();
    
  })

function managerView() {

    //use inquirer to prompt the questionS and available answer choices
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
            switch (answer.action) {
                case "View Products for Sale":
                 query = "SELECT * FROM products ORDER BY department_name";   
                 showProducts(query);

                 setTimeout(function() {
                    
                    managerView();

                 }, 10000);
                break;
              
            case "View Low Inventory":
             query = "SELECT * FROM products WHERE stock_quantity < 5 ORDER BY department_name";
            console.log(query);
            showProducts(query);
            setTimeout(function() {
                
                managerView();

           }, 10000);
            break;

      
              case "Add to Inventory":
            //   query = "UPDATE products SET stock_quantity =" + newQuantity + " WHERE item_id = " + inputID;
              addInventory();
              setTimeout(function() {
                
                managerView();

           }, 10000);
              break;
      
              case "Add New Product":
                addNewProduct();
            setTimeout(function() {
                
                managerView();

           }, 60000);
                break;

            case "Exit":
            connection.end()
            break;
      
            }
          });  
}
    

//VIEW AVAILABLE PRODUCTS AND LOW INVENTORY
   function showProducts(query) {
    console.log("showProducts");
    
    console.log("Selecting all products...\n");
     connection.query(query, function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for(var i = 0; i<res.length; i++){

          //store response for colum fields in variables for string interpolation
          var id = res[i].item_id;
          var name = res[i].product_name;
          var department = res[i].department_name;
          var price = res[i].customer_price;
          var quantity = res[i].stock_quantity;
        console.log(`ID: ${id} | Item: ${name} | Department: ${department} | Price: $${price} | Quantity: ${quantity}`);    // console.log('--------------------------------------------------------------------------------------------------')
      
    }
      //create a new table using a javascript constructor  
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
    });
    
  }

//ADDING INVENTORY
  function addInventory () {

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
    // console.log(typeof answer.id);
    // console.log(typeof answer.quantity);
    inputID = (answer.id);    
    newQuantity = (answer.quantity);

    var  query = "UPDATE products SET stock_quantity =" + newQuantity + " WHERE item_id = " + inputID;

    connection.query(query, function (err, res) {
        if (err) throw err;
        for(var i = 0; i<res.length; i++){
      }  
      });
      console.log("Inventory successfully added!!");  
      
  })
}

// ADDING NEW PRODUCT
  function addNewProduct () {
      // inquirer to prompt the required questions to add a new product to the database
    inquirer
    .prompt([{
        name: "id",
        type: "input",
        message: "Please enter the id of the product you would like to add to the database.",
        validate: function (value) {
            if (isNaN(value) === false) {
              // Determines if input value is not a number or is a number
              return true;
              
            }
            return false;
          }
    },
    {
        name: "quantity",
        type: "input",
        message: "Please enter how much you would like to add.",
        validate: function (value) {
            if (isNaN(value) === false) {
              // Determines if input value is not a number or is a number
              return true;
            }
            return false;
          }
    },
    {
        name: "productName",
        type: "input",
        message: "Please enter the name of the product you would like to add to the database."
    },
    {
        name: "price",
        type: "input",
        message: "Please enter the price of the product you are adding."
    },
    {
        name: "department",
        type: "input",
        message: "Please enter the department for the product."
    }])
    .then(function(answer){
        newProductID = (answer.id);    
        newProductQuantity = (answer.quantity);
        newProductName = (answer.productName);
        newProductDpt = (answer.department);
        newProductPrice = (answer.price);

        var query = "INSERT INTO products (item_id, product_name, department_name, customer_price, stock_quantity) VALUES (?)";
        var values = [
            answer.id,
            answer.productName,
            answer.department,
            answer.price,
            answer.quantity,
        ];
        // query = mysql.format(query,values);
        
            connection.query(query, [values], function (err, result) {
                // console.log(result);
                if (err) throw err;
                console.log("Number of Records Inserted: " + result.affectedRows);
                console.log("Item ID: " + result.insertId);
                managerView();                 
              });

  })
}


  

// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
  

// CREATE VIEW [Products for Sale] AS
// SELECT item_id, product_name, department_name, customer_price, stock_quantity
// FROM products

// CREATE VIEW [Low Inventory] AS
// SELECT stock_quantity
// FROM products
// WHERE stock_quantity < 5;

// CREATE VIEW [Current Product List] AS
// SELECT ProductID, ProductName
// FROM Products
// WHERE Discontinued = No;

// SELECT * FROM [Current Product List];
//=================================Setup Required Variables===============================
var Table = require('cli-table');
var mysql = require('mysql');
var inquirer = require('inquirer');

//=================================Connect to SQL database===============================

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Z",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt();
});

//=================================Inquirer introduction===============================

  function startPrompt() {

      inquirer.prompt([{

          type: "confirm",
          name: "confirm",
          message: "Welcome to Bamazon! Would you like to view our inventory?",
          default: true

      }]).then(function(user) {
          if (user.confirm === true) {
              inventory();
          } else {
              console.log("Thank you! Come back soon!");
          }
      });
  }

//=================================Inventory===============================

function inventory() {

    // instantiate
    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    listInventory();

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    function listInventory() {

      //Variable creation from DB connection

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {
                var itemId = res[i].item_id;
                var productName = res[i].product_name;
                var departmentName = res[i].department_name;
                var price = res[i].price;
                var stockQuantity = res[i].stock_quantity;
                //console.log(itemId);
                table.push(
                    [itemId, productName, departmentName, price, stockQuantity]
                );
                console.log(table.toString());
            }
            confirmBuyPrompt();
        });
    }
}

//=================================Inquirer confirm purchase===============================

  function confirmBuyPrompt() {

      inquirer.prompt([{

          type: "confirm",
          name: "confirmBuy",
          message: "Would you like to purchase an item?",
          default: true

      }]).then(function(user) {
          if (user.confirmBuy === true) {
              purchasePrompt();
          } else {
              console.log("Thank you! Come back soon!");
          }
      });
  }

  //=================================Inquirer choices===============================

    function purchasePrompt() {

        inquirer.prompt([{
            type: "input",
            name: "inputId",
            message: "Please enter the ID number of the item you would like to purchase.",
          },
          {
            type: "input",
            name: "inputNumber",
            message: "How many units of this item would you like to purchase?",
        }]).then(function(user) {

          //connect to database and replace search query with ID number input by user

          //list item information for user

          //subtract the unit amount input by user from the table stock quantity

          //check if the stock quantity is greater than 0 with user quantity deleted...
              //if not greater than 0, console log "not enough quantity in stock"
              //if greater than 0, console log "order success", and update database with new stock quantity
        });
    }

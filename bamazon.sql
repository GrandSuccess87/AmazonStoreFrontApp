CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE Products (
item_id int (10) auto_increment not null,
product_name varchar(100) not null,
department_name varchar (100) null,
customer_price decimal(10, 2) null,
stock_quantity int(10) null,
PRIMARY KEY(item_id)

);
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id int (10) auto_increment not null,
product_name varchar(100) not null,
department_name varchar (100) null,
customer_price decimal(10, 2) null,
stock_quanity int(10) null,
PRIMARY KEY(item_id)

);
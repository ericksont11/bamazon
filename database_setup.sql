drop database if exists bamazonDB;
create database bamazonDB;
use bamazonDB;

create table products (
	item_id int auto_increment,
    product_name varchar(50),
    department_name varchar(50),
    price decimal(6,2),
	stock_quantity integer(10),
    product_sales decimal(10,2),
    primary key (item_id)
);

create table departments (
	department_id int auto_increment,
    department_name varchar(50),
    overhead_costs decimal(10,2),
    primary key (department_id)
);

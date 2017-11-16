var express =	require("express");
var app		=	express();
var mysql	=	require("mysql");

var setupConnection	= require("./setupConnection");
var con = mysql.createConnection(setupConnection.setCon);


// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var tableName = 'K%'
//   var sql = "SELECT * FROM customers WHERE address LIKE ?";
//   con.query(sql,[tableName], function (err, result, field) {
//     if (err) throw err;
//     console.log(result);
//   });
// });


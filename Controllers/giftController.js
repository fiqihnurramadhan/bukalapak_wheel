var mysql	=	require("mysql");
var setupConnection	= require("./../setupConnection");
var service = mysql.createConnection(setupConnection.setCon);

var retrieveGifts = function(req,res){
	console.log("Starting retrieve all data");
	var sql = "SELECT * FROM Gift";
	service.query(sql, function (err, result, field) {
	    if (err) {
	    	res.json({status:400,message:'Failed'});
	    } else {
	    	res.json({status:200,message:'Get data success',data:result});
	    }
	});	
};


module.exports = {
	retrieveGifts:retrieveGifts
}


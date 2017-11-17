var mysql	=	require("mysql");
var setupConnection	= require("./../setupConnection");
var service = mysql.createConnection(setupConnection.setCon);

var retrieveGifts = function(req,res){
	service.connect(function(err) {
	  if (err) throw err;
	  console.log("Starting retrieve all data");
	  var sql = "SELECT * FROM Gift";
	  service.query(sql, function (err, result, field) {
	    if (err) throw err;
	    setTimeout(function()
			{
				res.json({status:200,message:'Get data success',data:result});				
			},100);
	  });
	});	
};


module.exports = {
	retrieveGifts:retrieveGifts
}


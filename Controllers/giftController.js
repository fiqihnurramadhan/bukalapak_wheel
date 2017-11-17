var mysql	=	require("mysql");
var setupConnection	= require("./../setupConnection");
var service = mysql.createConnection(setupConnection.setCon);

var retrieveGifts = function(req,res){
	service.connect(function(err) {
	  if (err) throw err;
	  console.log("Starting retrieve all data");
	  var sql = "SELECT * FROM Gift";
	  service.query(sql, function (err, result, field) {
	    if (err) {
	    	res.json({status:400,message:'Failed'});
	    } else {
	    	res.json({status:200,message:'Get data success',data:result});
	    }
	  	service.release()
	  });
	});	
};


module.exports = {
	retrieveGifts:retrieveGifts
}


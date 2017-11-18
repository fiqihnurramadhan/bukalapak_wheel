var mysql	=	require("mysql");
var setupConnection	= require("./../setupConnection");
var service = mysql.createConnection(setupConnection.setCon);

var retrieveGifts = function(req,res){
	console.log("Starting retrieve all data wiht price: " + req.params.price);
	var priceRangeChecking
	if (req.params.price < 100000) {
		priceRangeChecking = 1
	}
	else if (req.params.price < 500000) {
		priceRangeChecking = 2
	}
	else {
		priceRangeChecking = 3
	}

	var sql = "SELECT * FROM Gift Where price_range = ? OR price_range = 0";
	service.query(sql, [priceRangeChecking], function (err, result, field) {
	    if (err) {
	    	res.json({status:400,message:'Failed', error: err});
	    } else {
	    	result.push(result[Math.floor(Math.random() * (result.length-1))])
	    	res.json({status:200,message:'Get data success',data:result});
	    }
	});	

	// service.on('error', function(err) {
 //    console.log('db error', err);
 //    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
 //      retrieveGifts(req,res);                         // lost due to either server restart, or a
 //    } else {                                      // connnection idle timeout (the wait_timeout
 //      throw err;                                  // server variable configures this)
 //    }
 //  });

};


module.exports = {
	retrieveGifts:retrieveGifts
}


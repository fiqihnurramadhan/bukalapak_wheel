var mysql	=	require("mysql");
var setupConnection	= require("./../setupConnection");
var service = mysql.createConnection(setupConnection.setCon);

var retrieveInventories = function(req,res){
	service.connect(function(err) {
	  if (err) throw err;
	  var userId = req.params.id
	  console.log("Starting retrieve inventory with userId: "+ userId);
	  var creds = [userId]
	  var sql = "SELECT * FROM Gift_Inventory WHERE user_id = ?";
	  service.query(sql, creds, function (err, result, field) {
	    if (err) {
	    	res.json({status:400,message:'Failed'});
	    } else {
	    	res.json({status:200,message:'Get data success',data:result});
	    }
	  	service.release()
	  });
	});	

};

var checkVoucher = function(req,res){
  var userId = req.body.id
  var voucherCode = req.body.voucher

  var creds = [userId, voucherCode]
  var sql = "SELECT * FROM Gift g, Gift_Inventory i WHERE g.id = i.gift_id AND i.user_id = ? AND g.voucher_code = ?";
  service.query(sql, creds, function (err, result, field) {
    if (err) {
    	res.json({status:400,message:'Failed'});
    } else {
    	if (result.count() == 0) {
    		res.json({status:200, message:'Voucher not falid', data:result});
    	} else {
    		res.json({status:200, message:'Get data success', data:result});
    	}
    }
  	service.release()
  });
};

var useInventories = function(req,res){
  var userId = req.body.id
  var voucherCode = req.body.voucher

  var creds = [userId]
  var sql = "SELECT * FROM Gift_Inventory WHERE user_id = ?";
  service.query(sql, creds, function (err, result, field) {
    if (err) {
    	res.json({status:400,message:'Failed'});
    } else {
    	res.json({status:200,message:'Get data success',data:result});
    }
  	service.release()
  });
};

module.exports = {
	retrieveInventories:retrieveInventories
}
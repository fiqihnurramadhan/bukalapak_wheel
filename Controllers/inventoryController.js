var mysql	=	require("mysql");
var setupConnection	= require("./../setupConnection");
var service = mysql.createConnection(setupConnection.setCon);

var retrieveInventories = function(req,res){
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
  });
};

var checkVoucher = function(req,res){
  var userId = req.body.user_id
  var voucherCode = req.body.voucher
  var now = new Date();  
  var expiredDate = now.getDate();  
  now.setDate(expiredDate - 1);
  now = now.getTime() 

  var creds = [userId, voucherCode]
  var sql = "SELECT * FROM Gift g, Gift_Inventory i WHERE g.id = i.gift_id AND i.user_id = ? AND g.voucher_code = ? ORDER BY i.expired";
  service.query(sql, creds, function (err, result, field) {
    if (err) {
    	res.json({status:400,message:'Failed', error:err});
    } else {
    	if (result.length == 0) {
    		res.json({status:200, message:'Voucher not falid', data:{} });
    	} else if (result.length == 1) {
        if (now < result[0].expired.getTime()) {
          res.json({status:200, message:'Voucher verified', data:{expired:false, voucher:result[0]} }); 
        } else {
          res.json({status:200, message:'Voucher expired', data:{expired:true} });
        }
    	} else {
        for (var i = result.length - 1; i >= 0; i--) {
          if (now < result[i].expired) {
            res.json({status:200, message:'Voucher verified', data:{expired:false, voucher:result[0]} }); 
          } else {
            continue
          }
          res.json({status:200, message:'Voucher expired', data:{expired:true} });
        }
      }
    }
  });
};

var useInventory = function(req,res){
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
  });
};

var setInventory = function(req,res){
	console.log("Starting insert inventory for user_id"+ req.body.user_id );
  	var id = req.body.user_id
  	var gift_id = req.body.gift_id
  	var setDate = new Date();  
	var expiredDate = setDate.getDate();  
		setDate.setDate(expiredDate + 7);  	
  	var sql = "INSERT INTO Gift_Inventory (user_id, gift_id, expired) VALUES (?, ?, ?)";
  	
  	service.query(sql,[id,gift_id, setDate], function (err, result) {
    	if (err) {
    		res.json({status:400,message:'Failed', err: err});
	    } else {
	    	res.json({status:200,message:'Set data success',data:result});
	    }
	});
}

module.exports = {
	setInventory:setInventory,
	retrieveInventories:retrieveInventories,
  checkVoucher:checkVoucher,
  useInventory:useInventory
}

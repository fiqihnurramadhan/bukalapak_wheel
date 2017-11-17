var mysql	=	require("mysql");
var setupConnection	= require("./../setupConnection");
var service = mysql.createConnection(setupConnection.setCon);

var retrieveInventories = function(req,res){
	service.connect(function(err) {
	  if (err) throw err;
	  console.log("Starting retrieve inventory with userId: "+ req.params.id );
	  res.json({status:200,message:'Success',data:[]});
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
	retrieveInventories:retrieveInventories
}
var mysql	=	require("mysql");
var setupConnection	= require("./../setupConnection");
var service = mysql.createConnection(setupConnection.setCon);

var retrieveInventories = function(req,res){
	service.connect(function(err) {
	  if (err) throw err;
	  console.log("Starting retrieve inventory with userId: "+ req.params.id );
	  res.json({status:200,message:'Success',data:[]});
		service.release()
	});	

};

module.exports = {
	retrieveInventories:retrieveInventories
}
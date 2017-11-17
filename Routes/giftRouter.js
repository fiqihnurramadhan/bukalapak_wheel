var express=require('express');
var giftController=require('./../Controllers/giftController');
 
var giftRouter=express.Router();

giftRouter.route('/retrieveGifts')
	.get(giftController.retrieveGifts);

module.exports=giftRouter

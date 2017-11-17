var express=require('express');
var giftController=require('./../controllers/giftController');
 
var giftRouter=express.Router();

giftRouter.route('/add')
	.post(giftController.setGift);
giftRouter.route('/delete')
	.post(giftController.deleteGift);

giftRouter.route('/retrieve/:resourceId')
	.get(giftController.retrieveGift);
giftRouter.route('/retrieveAll')
	.get(giftController.retrieveGifts);

module.exports=giftRouter

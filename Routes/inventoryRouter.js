var express = require('express')
var controller = require('./../Controllers/inventoryController')

var router = express.Router()

router.route('/retrieveInventories/:id')
	.get(controller.retrieveInventories)

module.exports = router
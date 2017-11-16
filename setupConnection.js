var config = require("./config")

var setupConnection = {
  host: "belang.yippytech.com",
  user: config.user,
  password: config.secretKey,
  database: config.databaseName
}

module.exports = {
	"setCon":setupConnection
}
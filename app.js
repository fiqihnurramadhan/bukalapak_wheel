var express 	=	require("express");
var app			=	express();
var bodyParser	=	require('body-parser');
// setup web services

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
})
var portServer = 5000;
app.listen(portServer, function () {
    console.log('Start server on port:' + portServer)
})

// setup routes API
app.get('/', function (req, res) {
    res.send('<b>Bukalapak Wheel</b>');
});
var giftRouter = require("./Routes/giftRouter.js")
app.use('/gift',giftRouter)
var express = require('express');
var app = express();
var path = require('path');


app.set('port', 8080);

app.use(function(req, res, next){ 

    console.log(req.method, req.url);
    next();

});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

var server = app.listen(app.get('port'), function(){

    var port = server.address().port;
    console.log('Server up on port : ', port);

});
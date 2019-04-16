const express = require('express');
const http = require('http');
const path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// provide static files
app.use(express.static(path.join(__dirname,'public')))

require('./routes/route')(app);

const port = process.env.PORT || 8080;
http.createServer(app).listen(port,()=>{
    console.log(`Server is listening on port ${port}...`);
    console.log('Abdullah is love');
});

module.exports = app;

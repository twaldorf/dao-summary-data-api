"use strict";
var app = require('./app');
require('dotenv').config();
var port = process.env.PORT;
app.listen(port, function () {
    console.log("Serving on " + port);
});

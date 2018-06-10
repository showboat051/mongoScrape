/********************************
 * ***DEPENDENCIES**************/

var express = require('express')
var handlebars = require('express-handlebars')
var mongoose = require('mongoose')
var parser = require('body-parser')
var cheerio = require('cheerio')
var request = require('request')

var app = express();

app.use(express.static("public"));




app.listen(3000, function(){
    console.log("App running on port 3000")
});


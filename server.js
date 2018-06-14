/********************************
 * ***DEPENDENCIES**************/

var express = require('express');
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var parser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var mongojs = require('mongojs');
var path = require('path');

// EXPRESS
var app = express();
app.use(express.static("public"));

// MONGO DATABASE
var databaseUrl = "e3Site";
var collections = ["elements"];

var db = mongojs(databaseUrl, collections);
// In case of DB error
db.on("error", function(error){
    console.log("Something went wrong", error)
        });

//Simple route directing to home
app.get("/home", function(req,res){
    res.send("Hello world");
        });

// Gets data from the db
app.get("/all", function(req,res){
    db.elements.find({}, function(error,found){
        if(error){
            console.log(error);
                }
        else {
            res.json(found);
            }
    });
});

// Scraping from the website into the db
app.get("/scrape",function(req,res){
    request("https://www.gamespot.com/articles/e3-2018-schedule-for-press-conferences-ea-play-bet/1100-6458180/", function(error,response,html) {
       // console.log("INSIDE REQUEST")
        // A CHEERIO for scraping
        var $ = cheerio.load(html);
        console.log($)
        //Scraping for the main header
        $("#masthead").each(function(i, element){
           // console.log("INSIDE MASTHEAD!")
           // var head = $(element).children("a").text();
           var head = $(element).children('.container').children(".masthead-nav").children(".nav-bar").children(".nav-bar__item").children(".js-click-tag").text();
           console.log("HEAD: "+ head)
            var link = $(element).children("a").attr("href");
            $("#masthead").text(head)
            

            if(head && link) {
                db.elements.insert({
                    head: head,
                    link: link
                },
                function(err, inserted){
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(inserted);
                    }
                });
            }
            });
        });
        res.sendfile(path.join(__dirname,"./public/index.html"))
    });

app.listen(3000, function(){
console.log("App running on port 3000");
});
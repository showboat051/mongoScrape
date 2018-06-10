request("https://www.gamespot.com/articles/e3-2018-schedule-for-press-conferences-ea-play-bet/1100-6458180/")



// var $ = cheerio.load(html);

var results = [];

// The Header
$("#masthead").each(function(i, element){
    
    var header = $(element).text();
    var link = $(element).children().attr("href");

    results.push({
        header: header,
        link: link
    });

});
console.log(results);

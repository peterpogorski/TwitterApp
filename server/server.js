var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var https = require('https');
var qs = require('qs');
var sentiment = require('sentiment');

var app = express();
var port = 3000;

var config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('../app'));

var analyzeSentiment = function(data) {
    
    for(var i = 0; i < data.statuses.length; i++){
        var a = sentiment(data.statuses[i].text);
        data.statuses[i].sentiment = a;
    }
    return data;
}

app.get('/twitter/tweets', function(req, res) {
    var options = {
        host: 'api.twitter.com',
        path: '/1.1/search/tweets.json?' + qs.stringify(req.query),
        method: 'GET',
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.bearer
        }
    };
    var success = function(data) {
        var sentimentTweets = analyzeSentiment(data);
        //res.json(data);
        res.json(sentimentTweets);
    };
    var err = function(data) {
        res.json(data);
    };
    var request = https.request(options).on('response', function(response) {
        var data = '';
        var error = '';
        response.on("data", function(d) {
            data += d;
        });
        response.on("error", function(e) {
            error = e;
        });
        response.on('end', function() {
            if (error) {
                err(JSON.parse(JSON.stringify(e)));
            } else {
                success(JSON.parse(data));
            }

        });
    });
    request.on("error", function(e) {
        var error = JSON.parse(JSON.stringify(e));
        error.text = "Error fetching!";
        err(error);
    });
    request.end();
});


app.listen(port);
console.log("Started Node.js server on port " + port);
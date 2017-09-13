
var app=require('../../express');

var http =require('http');

app.get("/api/shopify/id",getCustomers);


function getCustomers(req,res) {
    var Promise = require("bluebird");
    var request = require('request-promise');

    var requests = [];

// fetch data from URL
    for (i=1; i<=16; i++){
        requests.push({
           url :  'https://backend-challenge-winter-2017.herokuapp.com/customers.json?page='+i
        });
    }
    Promise.map(requests, function(obj) {
        return request(obj).then(function(body) {
            return JSON.parse(body);
        });
    }).then(function(results) {
        console.log(results);
        res.json(results);
    }, function(err) {
    });
}


'use strict';
var express = require('express');
var app = express();
let bodyParser = require('body-parser');


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let store = [{
    bzip: 'this is the data from the server',
    gittername: 'gitternaaaaame',
}];


app.get('/', function(req, res){
    console.log('hi from get "/"');
    res.render('index');
});

app.get('/data', function(req, res){
    console.log('hi from "data"');
    res.send({ store: store });
});

app.post('/newItem', function(req, res){
    console.log(req.body);
    console.log('hi from post');
    store.push(req.body);

    console.log(store);
    res.send(store);
});

app.listen(3000);
// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will serve the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions
app.get("/lions", (req,res) =>{
    res.header(200)
    res.send(lions)
    res.end()
})

app.get("/lions/:id", (req,res)=>{
    res.header(200)
    res.send(lions.find(lion => lion.id == app.param("id")))
    res.end()
})

app.post("/lions", (req,res) => {
    res.header(201)
    var lion = req.body
    id += 1
    lion.id = id
    lions.push(lion)
    res.send(lion)
    res.end()
})

app.put("/lions/:id", (req,res) => {
    res.header(200)
    var currentId = req.param("id")
    var lion = lions.find(lion => lion.id == currentId)
    lion.name = req.body.name
    lion.pride = req.body.pride
    lion.age = req.body.age
    lion.gender = req.body.gender
    res.send(lion)
})

app.delete("/lion/:id", (req,res) =>{
    res.header(200)
    var lion = lions.find(lion => lion.id == req.param.id)
    lions = lions.filter(lion => lion.id != req.param("id"))
    res.send(lion)
    res.end()

})

app.listen(3000);
console.log('on port 3000');

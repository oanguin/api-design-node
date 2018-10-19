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
//Replace find methods with lodash as a more convenient method to deal with arrays
app.get("/lions", (req,res) =>{
    res.header(200)
    res.json(lions)
    res.end()
})

app.get("/lions/:id", (req,res)=>{
    res.header(200)
    var lion = _.find(lions, {id : req.params.id})
    //res.send(lions.find(lion => lion.id == app.param("id")))
    res.json(lion)
    res.end()
})

app.post("/lions", (req,res) => {
    res.header(201)
    var lion = req.body
    id++
    lion.id = id + ''
    lions.push(lion)
    res.json(lion)
    res.end()
})

app.put("/lions/:id", (req,res) => {
    res.header(200)
    var update = req.body
    delete update.id //incase idd send just delete it
    //more efficient way of doing update with loadash

    var lion = _.find(lions, {id : req.params.id})
    if(!lion){
        res.send()
    }else{
        //Overwrites values with what is on the right with what is on the left.
        var updatedLion = _.assign(lions[lion],update)
        res.json(lion)
    }
    /*var lion = lions.find(lion => lion.id == currentId)
    lion.name = req.body.name
    lion.pride = req.body.pride
    lion.age = req.body.age
    lion.gender = req.body.gender*/
    res.end()
})

app.delete("/lion/:id", (req,res) =>{
    res.header(200)
    //var lion = lions.find(lion => lion.id == req.param.id)
    var lion = _.find(lions, {id : req.params.id})
    /*lions = _.remove(lions, (l) => {
        l.id == lion.id
    })*/
    lions.splice(lion,1)
    //lions = lions.filter(lion => lion.id != req.param("id"))
    res.json(lion)
    res.end()

})

app.listen(3000);
console.log('on port 3000');

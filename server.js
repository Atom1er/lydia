var express = require("express");
var app = express();
var path = require("path");
var env = require("dotenv");
var db_users = require("./app/db/users");
var db_tasks = require("./app/db/tasks");
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'app/public')));

var isloggedIn = false;

var groupe = ['School', 'House', 'Legal', 'Hobbies', 'None'];

var school = ['ATI exam', 'Group studies', 'Biologie Assignment', 'Lab test', 'Assesment review', 'Get a Calculator', 'Set Dashboard', 'Test on tuesday'];
var house = ['Laundry', 'Buy Meat', 'General Cleanning', 'Freezer Cleanning', 'Buy Bed Sheets'];
var legal = ['See Lawyer for P.T', 'Call Car dealer for plates', 'Renew I-20'];
var hobbies = ['Watch stranger Things', 'Go to the park', 'Barbecue on Friday'];
var none = ['Car vidange', 'Visiter Papa Eve', 'Call Kokouvi'];
var task = {
    school: school,
    house: house,
    legal: legal,
    hobbies: hobbies,
    none: none
};

app.post("/api/login", (req, res) => {
    console.log(req.body);
    isloggedIn = true;
    res.send(isloggedIn);
});

app.get("/api/login-check", (req, res) => {
    var data = {
        groupe: groupe,
        isloggedIn: isloggedIn,
        task: task
    }
    res.send(data);
});


app.listen(PORT, ()=>{
    console.log('Server listenning to http://localhost:'+PORT);
})
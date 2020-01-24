var express = require("express");
var app = express();
var path = require("path");
var env = require("dotenv");
var db_users = require("./app/db/users");
var db_tasks = require("./app/db/tasks");
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'app/public')));

var isloggedIn = false;

var groupe = ['School', 'House', 'Legal', 'Hobbies', 'General'];

var dt = {};
var Sequelize = require("sequelize");
function dataTable(username, isloggedIn){
    if(isloggedIn){
        db_tasks.findAll({
            where: {
                [Sequelize.Op.or]: [{creator: username}, {assignedTo: username}]
            }
        }).then(task => {
            dt.tasks = task;
            // console.log("task", dt);
        }).catch(function (err) {
            console.log("err", err);
        });
    }
}
var res = false;
function login(uc){
    console.log("uc", uc);

    db_users.findOne({
        where: {
            username: uc.n,
            userpassword: uc.pw
        }
    }).then(user => {
        res = true;
    }).catch(function (err) {
        return false;
    });
    console.log(res)
}

app.post("/api/new-task", (req, res) => {
    var isIn = res;
    var response;
    if(isIn){
        db_tasks.create({
            dateOfCreation: req.body.dateOfCreation,
            dueDate: req.body.dueDate,
            creator: req.body.creator,
            assignedTo: req.body.assignedTo,
            taskBody: req.body.taskBody,
            taskTitle: req.body.taskTitle,
            priority: req.body.priority,
            state: req.body.state,
            groupe: req.body.groupe
        }).then((results) => {
            response = false;
            res.send(!response);
        });
    } else{
        res.send("Not Authorized");
    }

});

app.post("/api/login", (req, res) => {
    //user = {};
    db_users.findOne({
        where: {
            username: req.body.un,
            userpassword: req.body.upw
        }
    }).then(user => {
        console.log("user", user);
        isloggedIn = true;
        dt.username = user.username;
        dt.pw = user.userpassword;
        dataTable(dt.username, isloggedIn);
        res.send(isloggedIn);
    }).catch(function (err) {
        console.log("err", err);
        isloggedIn = false;
        res.send(isloggedIn);
    });

});

app.get("/api/login-check", (req, res) => {
    var data = {
        groupe: groupe,
        isloggedIn: isloggedIn,
        data: dt
    }
    isloggedIn = false;
    res.send(data);
});

app.get("/api/logout", (req, res) => {
    dt.username = "";
    dt.tasks = "";
    dt.pw = "";
    isloggedIn = false;
    res.send(!isloggedIn);
});


app.listen(PORT, () => {
    console.log('Server listenning to http://localhost:' + PORT);
})
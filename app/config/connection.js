var Sequelize = require("sequelize");
var port = process.env.PORT || 3306;

var sequelize = new Sequelize("honeyTaskManager", "root", "Elvir@93", {
    host:"localhost",
    PORT: port,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});



module.exports = sequelize;
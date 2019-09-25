var Sequelize = require("sequelize");
var port = process.env.PORT || 3306;

var sequelize = new Sequelize("gy47wizye7w02h20", "pl9u2s6xlgztbt21", "zuzb8zyq4wwm8dbk", {
    host:"g9fej9rujq0yt0cd.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
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
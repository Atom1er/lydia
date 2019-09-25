var Sequelize = require('sequelize');
var con = require('../config/connection');

var tasks = con.define("task", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    dateOfCreation: Sequelize.DATE,
    dueDate: Sequelize.DATE,    
    creator: Sequelize.STRING,
    assignedTo: Sequelize.STRING,
    taskBody: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taskTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priority: {
        type: Sequelize.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Medium'
    },
    status: {
        type: Sequelize.ENUM('To Do', 'In Progress', 'Done'),
        defaultValue: 'To Do'
    },
    groupe: {
        type: Sequelize.ENUM('School', 'House', 'Legal', 'Hobbies', 'None'),
        defaultValue: 'None'
    }
});

module.exports = tasks;
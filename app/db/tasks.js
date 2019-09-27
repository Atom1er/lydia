var Sequelize = require('sequelize');
var con = require('../config/connection');

var tasks = con.define("tasks", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    dateOfCreation: {
        type: Sequelize.DATE,
        allowNull: false
    },   
    dueDate: {
        type: Sequelize.DATE,
        allowNull: false
    },    
    creator:  {
        type: Sequelize.STRING,
        allowNull: false
    },
    assignedTo:  {
        type: Sequelize.STRING,
        allowNull: false
    },
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
    state: {
        type: Sequelize.ENUM('To Do', 'In Progress', 'Done'),
        defaultValue: 'To Do'
    },
    groupe: {
        type: Sequelize.ENUM('School', 'House', 'Legal', 'Hobbies', 'General'),
        defaultValue: 'General'
    }
});

module.exports = tasks;
Create database honeyTaskManager;

use honeyTaskManager;

Create table tasks(
id INT NOT NULL AUTO_INCREMENT,
dateOfCreation DATETIME NOT NULL DEFAULT NOW(),
dueDate DATETIME NOT NULL,
creator varchar(200) NOT NULL, 
assignedTo varchar(200) NOT NULL,
taskBody text NOT NULL,
taskTitle text NOT NULL,
priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
state ENUM('To Do', 'In Progress', 'Done') DEFAULT 'To Do',
groupe ENUM('School', 'House', 'Legal', 'Hobbies', 'General') DEFAULT 'General',
PRIMARY KEY (id)
);

select * from tasks;
INSERT INTO `honeytaskmanager`.`tasks` (`dueDate`, `creator`, `assignedTo`, `taskBody`, `taskTitle`, `priority`, `state`, `groupe`) VALUES (now(), 'thomas', 'thomas', 'Test number will be a huge success. Promise!', 'Test 1', 'High', 'In Progress', 'School');


create table users(
id INT NOT NULL AUTO_INCREMENT,
firstname varchar(45) NOT NULL,
lastname varchar(45) NOT NULL,
username varchar(45) NOT NULL,
about text,
email varchar(45) NOT NULL,
userpassword varchar(45) NOT NULL,
last_login DATETIME,
state ENUM('active', 'inactive') default 'active',
PRIMARY KEY (id)
);
INSERT INTO `honeytaskmanager`.`users` (`firstname`, `lastname`, `username`, `about`, `email`, `userpassword`) VALUES ('thomas', 'Minoungou', 'atom', 'Whatever You want to says.', 'at@gmail.com', 'abcd1234');

select * from users;
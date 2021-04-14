const Sequelize = require("sequelize");

const dbConfig = require("../config/database");

const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Institution = require("../models/Institution");
const Course = require("../models/Course");
const Class = require("../models/Class");
const Level = require("../models/Level");
const User = require("../models/User");

const conex = new Sequelize(dbConfig.url, dbConfig.config);

Teacher.init(conex);
Student.init(conex);
Institution.init(conex);
Course.init(conex);
Class.init(conex);
Level.init(conex);
User.init(conex);

Student.associate(conex.models);
Teacher.associate(conex.models);
Institution.associate(conex.models);
Course.associate(conex.models);
Class.associate(conex.models);
Level.associate(conex.models);
User.associate(conex.models);

for (let assoc of Object.keys(Institution.associations)) {
    for (let accessor of Object.keys(Institution.associations[assoc].accessors)) {
        console.log(Institution.name + '.' + Institution.associations[assoc].accessors[accessor] + '()');
    }
}
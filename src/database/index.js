const Sequelize = require("sequelize");

const dbConfig = require("../config/database");

const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

const conex = new Sequelize(dbConfig.url, dbConfig.config);

Teacher.init(conex);
Student.init(conex);
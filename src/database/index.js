const Sequelize = require("sequelize");

const dbConfig = require("../config/database");

const Achievement = require("../models/Achievement");
const Answer = require("../models/Answer");
const Class = require("../models/Class");
const Contract = require("../models/Contract");
const Course = require("../models/Course");
const Question = require("../models/Question");
const Quizz = require("../models/Quizz");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Theme = require("../models/Theme");
const User = require("../models/User");
const Institution = require("../models/Institution");
const Level = require("../models/Level");

const conex = new Sequelize(dbConfig.url, dbConfig.config);

Teacher.init(conex);
Student.init(conex);
Institution.init(conex);
Course.init(conex);
Class.init(conex);
Level.init(conex);
User.init(conex);
Achievement.init(conex);
Answer.init(conex);
Theme.init(conex);
Contract.init(conex);
Question.init(conex);
Quizz.init(conex);

Student.associate(conex.models);
Teacher.associate(conex.models);
Institution.associate(conex.models);
Course.associate(conex.models);
Class.associate(conex.models);
Level.associate(conex.models);
User.associate(conex.models);
Achievement.associate(conex.models);
Answer.associate(conex.models);
Theme.associate(conex.models);
Contract.associate(conex.models);
Question.associate(conex.models);
Quizz.associate(conex.models);

for (let assoc of Object.keys(Teacher.associations)) {
  for (let accessor of Object.keys(Teacher.associations[assoc].accessors)) {
    console.log(
      Teacher.name +
        "." +
        Teacher.associations[assoc].accessors[accessor] +
        "()"
    );
  }
}

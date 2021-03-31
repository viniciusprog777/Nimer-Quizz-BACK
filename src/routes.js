const express = require("express");

const teacherControllers = require("./controllers/teachers");
const studentControllers = require("./controllers/students");

const routes = express();


routes.get("/teacher", teacherControllers.index);

routes.get("/student", studentControllers.index);

module.exports = routes;
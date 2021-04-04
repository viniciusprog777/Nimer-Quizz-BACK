const express = require("express");

const teacherControllers = require("./controllers/teachers");
const studentControllers = require("./controllers/students");

const routes = express();


routes.get("/teacher", teacherControllers.index);
routes.post("/teacher", teacherControllers.store);

routes.get("/student", studentControllers.index);
routes.get("/student/:id", studentControllers.find);
routes.post("/student", studentControllers.store);

module.exports = routes;
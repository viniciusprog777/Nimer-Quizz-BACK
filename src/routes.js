const express = require("express");

const teacherControllers = require("./controllers/teachers");
const studentControllers = require("./controllers/students");
const institutionControllers = require("./controllers/institution");
const sessionsControllers = require("./controllers/sessions");

const routes = express();


routes.get("/teacher", teacherControllers.index);
routes.post("/teacher", teacherControllers.store);

routes.get("/student", studentControllers.index);
routes.get("/student/:id", studentControllers.find);
routes.post("/student", studentControllers.store);

routes.get("/institution", institutionControllers.index);
routes.post("/institution", institutionControllers.store);

routes.post("/sessions", sessionsControllers.store);

module.exports = routes;
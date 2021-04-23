const express = require("express");

const authMiddleware = require("./middleware/authorization");

const teacherControllers = require("./controllers/teachers");
const studentControllers = require("./controllers/students");
const institutionControllers = require("./controllers/institution");
const sessionsControllers = require("./controllers/sessions");
const classesControllers = require("./controllers/classes");
const courseControllers = require("./controllers/courses");

const routes = express();

routes.post("/sessions", sessionsControllers.store);

routes.use(authMiddleware);

routes.get("/teacher", teacherControllers.index);
routes.post("/teacher", teacherControllers.store);

routes.get("/student", studentControllers.index);
routes.get("/student/:id", studentControllers.find);
routes.post("/student", studentControllers.store);

routes.get("/institution", institutionControllers.index);
routes.post("/institution", institutionControllers.store);

routes.get("/class", classesControllers.index);
routes.post("/class", classesControllers.store);

routes.get("/course", courseControllers.index);
routes.post("/course", courseControllers.store);

module.exports = routes;

const express = require("express");

const studentValidation = require("./validators/studentValidation");
const teacherValidation = require("./validators/teacherValidation");
const institutionValidation = require("./validators/instituionValidation");
const classesValidation = require("./validators/classValidation");
const courseValidation = require("./validators/courseValidation");
const authMiddleware = require("./middleware/authorization");

const teacherControllers = require("./controllers/teachers");
const studentControllers = require("./controllers/students");
const institutionControllers = require("./controllers/institution");
const sessionsControllers = require("./controllers/sessions");
const classesControllers = require("./controllers/classes");
const courseControllers = require("./controllers/courses");
const classStudentControllers = require("./controllers/classStudent")
const courseStudentControllers = require("./controllers/courseStudent")

const routes = express();

routes.post("/sessions", sessionsControllers.store);
routes.post(
  "/institution",
  //institutionValidation.create,
  institutionControllers.store
  );
routes.get("/institution", institutionControllers.index);

routes.use(authMiddleware);

routes.get("/teacher", teacherControllers.index);
routes.post("/teacher", 
  //teacherValidation.create,
  teacherControllers.store);

routes.get("/student", studentControllers.index);
routes.get("/student/:id", studentControllers.find);
routes.post("/student",
  //studentValidation.create,
  studentControllers.store);



routes.get("/class", classesControllers.index);
routes.post("/class/:id",
  //classesValidation.create, 
  classesControllers.store);
routes.post("/class/:id/student", classStudentControllers.index);

routes.get("/course", courseControllers.index);
routes.post("/course",
//courseValidation.create,
courseControllers.store);
routes.post("/course/:id/student", courseStudentControllers.index);

module.exports = routes;

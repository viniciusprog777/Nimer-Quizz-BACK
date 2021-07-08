const express = require("express");

const Multer = require("multer");

const multer = Multer();

const studentValidation = require("./validators/studentValidation");
const teacherValidation = require("./validators/teacherValidation");
const institutionValidation = require("./validators/instituionValidation");
const classesValidation = require("./validators/classValidation");
const courseValidation = require("./validators/courseValidation");
const uploadSingleImage = require("./middleware/uploadSingleImage");
const uploadFirebase = require("./services/uploadFirebase");
const authMiddleware = require("./middleware/authorization");

const teacherControllers = require("./controllers/teachers");
const quizzControllers = require("./controllers/quizzes");
const studentControllers = require("./controllers/students");
const institutionControllers = require("./controllers/institution");
const imageControllers = require("./controllers/image")
const questionControllers = require("./controllers/question");
const choiceControllers = require("./controllers/choice");
const sessionsControllers = require("./controllers/sessions");
const classesControllers = require("./controllers/classes");
const courseControllers = require("./controllers/courses");
const classStudentControllers = require("./controllers/classStudent");
const classTeacherControllers = require("./controllers/classTeacher");
const courseStudentControllers = require("./controllers/courseStudent");
const courseTeacherControllers = require("./controllers/courseTeacher");
const testeControllers = require("./controllers/teste");

const routes = express();

routes.get("/teste", testeControllers.index)
routes.post("/sessions", sessionsControllers.store);
routes.post(
  "/institution",
  institutionValidation.create,
  institutionControllers.store
);
routes.get("/institution", institutionControllers.index);

routes.use(authMiddleware);

routes.get("/teacher", teacherControllers.index);
routes.post("/teacher", teacherValidation.create, teacherControllers.store);

routes.get("/student", studentControllers.index);
routes.get("/student/:id", studentControllers.find);
routes.post("/student", studentValidation.create, studentControllers.store);

routes.get("/quizz/:id", quizzControllers.index);

routes.get("/class", classesControllers.index);
routes.post("/class/:id", classesValidation.create, classesControllers.store);

routes.post("/class/:id/student", classStudentControllers.store);
routes.get("/class/:id/student", classStudentControllers.index);

routes.get("/course", courseControllers.index);
routes.post("/course", courseValidation.create, courseControllers.store);
routes.get("/course/student", courseStudentControllers.index);
routes.post("/course/:id/student", courseStudentControllers.store);
routes.get("/course/teacher", courseTeacherControllers.index);
routes.post("/course/:id/teacher", courseTeacherControllers.store);
routes.get("/class/:id/teacher", classTeacherControllers.index);

routes.get("/question", questionControllers.index);
routes.post("/question", questionControllers.store);


routes.post("/choice/:id", choiceControllers.store);

routes.post("image", uploadSingleImage, uploadFirebase, imageControllers.store)

module.exports = routes;

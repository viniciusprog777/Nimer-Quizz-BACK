const Class = require("../models/Class");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const Institution = require("../models/Institution");

module.exports = {
  async store(req, res) {
    const { teacher } = req.body;
    const { userId, userLevel } = req;
    const courseId = req.params.id;

    let course = await Course.findByPk(courseId);
    const institution = await Institution.findOne({
      where: {
        user_id: userId,
      },
    });
    try {
      if (!institution || userLevel > 1)
        return res.status(404).send({ error: "Instituição não encontrado!" });

      if (!course)
        return res.status(400).send({ error: "Curso não encontrado!" });

      await course.addTeacher(teacher);

      return res.status(201).send("Professores Adicionados");
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

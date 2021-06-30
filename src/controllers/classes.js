const Class = require("../models/Class");
const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    try {
      const classes = await Class.findAll();

      res.status(200).send(classes);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async store(req, res) {
    const { name, image } = req.body;
    const { userId, userLevel } = req.user;
    const courseId = req.params.id;

    let classes = await Class.findOne({
      where: {
        name,
      },
    });
    const teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });
    const course = await Course.findByPk(courseId);

    if (!teacher || userLevel > 2)
      return res.status(404).send({ error: "Professor não encontrado!" });

    if (classes) return res.status(400).send({ error: "Classe já existe!" });
    try {
      classes = await teacher.createClass({
        name,
        image,
      });
      await course.addClass(classes);

      return res.status(201).send(classes);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

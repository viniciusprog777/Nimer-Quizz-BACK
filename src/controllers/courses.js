const Course = require("../models/Course");
const Institution = require("../models/Institution");

module.exports = {
  async index(req, res) {
    try {
      const courses = await Course.findAll();

      res.status(200).send(courses);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async store(req, res) {
    const { name, description } = req.body;

    let course = await Course.findOne({
      where: {
        name,
      },
    });
    const institution = await Institution.findByPk(1);

    if (!institution)
      return res.status(404).send({ error: "Instituição não encontrado!" });

    if (course) return res.status(400).send({ error: "Curso já existe!" });
    try {
      course = await institution.createCourse({
        name,
        description,
      });

      return res.status(201).send(course);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

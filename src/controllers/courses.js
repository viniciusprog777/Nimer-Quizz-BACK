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
    const { name, description, image } = req.body;
    const { userId, userLevel } = req;

    let course = await Course.findOne({
      where: {
        name,
      },
    });
    const institution = await Institution.findOne({
      where:{
        user_id: userId
      }
    });

    if (!institution || userLevel > 1)
      return res.status(404).send({ error: "Instituição não encontrado!" });

    if (course) return res.status(400).send({ error: "Curso já existe!" });
    try {
      course = await institution.createCourse({
        name,
        description,
        image
      });

      return res.status(201).send(course);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

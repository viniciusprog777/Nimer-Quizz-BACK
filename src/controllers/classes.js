const Class = require("../models/Class");
const Teacher = require("../models/Teacher");

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
    const { name } = req.body;

    let classes = await Class.findOne({
      where: {
        name,
      },
    });
    const teacher = await Teacher.findByPk(1);

    if (!teacher)
      return res.status(404).send({ error: "Professor não encontrado!" });

    if (classes) return res.status(400).send({ error: "Classe já existe!" });
    try {
      classes = await teacher.createClass({
        name,
      });

      return res.status(201).send(classes);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

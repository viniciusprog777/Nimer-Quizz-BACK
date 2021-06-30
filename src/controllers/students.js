const Institution = require("../models/Institution");
const Level = require("../models/Level");
const Student = require("../models/Student");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const students = await Student.findAll();

      res.status(200).send(students);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async store(req, res) {
    const { name, email, password, dateBirthday } = req.body;
    const { userId, userLevel } = req.user;

    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    const institution = await Institution.findOne({
      where: {
        user_id: userId,
      },
    });
    const level = await Level.findByPk(3);

    if (!institution || userLevel > 1)
      return res.status(404).send({ error: "Instituição não encontrado!" });

    if (user) return res.status(400).send({ error: "Usuario existente!" });

    const passwordCript = bcrypt.hashSync(password);

    try {
      user = await level.createUser({
        name,
        email,
        password: passwordCript,
        status: 1,
      });

      student = await user.createStudent({
        date_birthday: dateBirthday,
      });

      await institution.addStudent(student);
      return res.status(201).send(student);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async find(req, res) {
    const id = req.params.id;

    let student = await Student.findByPk(id, {
      attributes: ["id", "name", "email", "date_birthday"],
    });
    try {
      if (student) return res.status(200).send(student);
      return res.status(400).send({ error: "Aluno não encontrado!" });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

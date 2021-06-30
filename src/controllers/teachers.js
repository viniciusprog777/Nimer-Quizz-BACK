const Institution = require("../models/Institution");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Level = require("../models/Level");

module.exports = {
  async index(req, res) {
    try {
      const teachers = await Teacher.findAll();

      res.status(200).send(teachers);
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
    const level = await Level.findByPk(2);

    const institution = await Institution.findOne({
      where: {
        user_id: userId,
      },
    });

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

      await user.createTeacher({
        date_birthday: dateBirthday,
      });

      let teacher = await Teacher.findOne({
        where: {
          user_id: user.id,
        },
      });
      await institution.addTeacher(teacher);

      return res.status(201).send(teacher);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async find(req, res) {
    const id = req.params.id;

    let teacher = await Teacher.findByPk(id, {
      attributes: ["id", "name", "email", "date_birthday"],
    });
    try {
      if (teacher) return res.status(200).send(teacher);
      return res.status(400).send({ error: "Professor não encontrado!" });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

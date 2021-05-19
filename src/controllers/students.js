const Institution = require("../models/Institution");
const Student = require("../models/Student");

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
    const { userId, userLevel } = req;

    let student = await Student.findOne({
      where: {
        email: email,
      },
    });
    const institution = await User.findByPk(userId);

    if (!institution || userLevel !== 1 || institution.status === 0)
      return res.status(404).send({ error: "Instituição não encontrado!" });

    if (student) return res.status(400).send({ error: "Usuario existente!" });

    const passwordCript = bcrypt.hashSync(password);

    try {
      student = await User.create({
        name,
        email,
        password: passwordCript,
        status: 1
      });
      await student.addInstitution(institution);

      await student.createStudent({
        date_birthday: dateBirthday,
      });
      await student.getLevel(3)

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

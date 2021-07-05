const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Quizz = require("../models/Quizz");

module.exports = {
  async index(req, res) {
    const classId = req.params.id;

    let classes = await Class.findByPk(classId);

    try {
      if (!classes)
        return res.status(400).send({ error: "Turma não encontrada!" });

      const quizzes = await Quizz.findAll({
        where: {
          class_id: classId,
        },
      });
      return res.status(201).send(quizzes);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async store(req, res) {
    const { userId, userLevel } = req.user;
    const { title } = req.body;
    const classId = req.params.id;

    let classes = await Class.findByPk(classId);
    const teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });

    try {
      if (!teacher || userLevel > 2)
        return res.status(404).send({ error: "Professor não encontrado!" });

      if (!classes)
        return res.status(400).send({ error: "Turma não encontrada!" });

      const quizz = await Quizz.create({
        title,
        status_quizz: "Em Preparação",
      });

      return res.status(201).send(quizz);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async update(req, res) {
    const { userId, userLevel } = req.user;
    const { status } = req.body;
    const quizzId = req.params.id;

    let quizz = await Quizz.findByPk(quizzId);

    const teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });

    try {
      if (!teacher || userLevel > 2)
        return res.status(404).send({ error: "Professor não encontrado!" });

      if (!quizz)
        return res.status(400).send({ error: "Quizz não encontrado!" });

      quizz.status_quizz = status;

      quizz.save();

      return res.status(200).send("Quizz Atualizado!");
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }

    let classes = await Class.findByPk(classId);

    try {
      if (!classes)
        return res.status(400).send({ error: "Turma não encontrada!" });

      const quizzes = await Quizz.findAll({
        where: {
          class_id: classId,
        },
        include: [
          {
            association: "Teacher",
            attributes: ["id", "name"],
          },
        ],
      });
      return res.status(201).send(quizzes);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async store(req, res) {
    const { userId, userLevel } = req.user;
    const { title } = req.body;
    const classId = req.params.id;

    let classes = await Class.findByPk(classId);
    const teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });

    try {
      if (!teacher || userLevel > 2)
        return res.status(404).send({ error: "Professor não encontrado!" });

      if (!classes)
        return res.status(400).send({ error: "Turma não encontrada!" });

      const quizz = await Quizz.create({
        title,
        status_quizz: "Em Preparação",
      });

      return res.status(201).send(quizz);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async update(req, res) {
    const { userId, userLevel } = req.user;
    const { status } = req.body;
    const quizzId = req.params.id;

    let quizz = await Quizz.findByPk(quizzId);

    const teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });

    try {
      if (!teacher || userLevel > 2)
        return res.status(404).send({ error: "Professor não encontrado!" });

      if (!quizz)
        return res.status(400).send({ error: "Quizz não encontrado!" });

      quizz.status_quizz = status;

      quizz.save();

      return res.status(200).send("Quizz Atualizado!");
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

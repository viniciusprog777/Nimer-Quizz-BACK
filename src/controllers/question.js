const Teacher = require("../models/Teacher");
const Question = require("../models/Question");

module.exports = {
  async index(req, res) {
    try {
      const questions = await Question.findAll({
        attributes: ["id", "title", "image"],
        include: [
          {
            association: "Choices",
            attributes: ["id", "description", "image", "correct_option"],
          },
        ],
      });
      res.status(200).send(questions);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async store(req, res) {
    const { userId, userLevel } = req.user;
    const { title, image } = req.body;

    const teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });

    try {
      if (!teacher || userLevel > 2)
        return res.status(404).send({ error: "Professor não encontrado!" });

      const question = await teacher.createQuestion({
        title,
        image,
      });
      return res.status(201).send(question);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

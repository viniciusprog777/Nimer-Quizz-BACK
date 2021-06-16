const Question = require("../models/Question");
const Teacher = require("../models/Teacher");

module.exports = {
  async store(req, res) {
    const { userId, userLevel } = req;
    const { description, image, correctOption } = req.body;
    const questionId = req.params.id;

    let question = await Question.findByPk(questionId);

    const teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });

    try {
      if (!teacher || userLevel > 2)
        return res.status(404).send({ error: "Professor não encontrado!" });

      if (!question)
        return res.status(400).send({ error: "Questão não encontrada!" });

      const choice = await question.createChoice({
        description,
        image,
        correct_option: correctOption,
      });

      return res.status(201).send(choice);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

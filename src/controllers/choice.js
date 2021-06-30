const Choice = require("../models/Choice");
const Question = require("../models/Question");
const Teacher = require("../models/Teacher");

module.exports = {
  async store(req, res) {
    const { userId, userLevel } = req.user;
    const { description, image, correctOption } = req.body;
    const questionId = req.params.id;

    let question = await Question.findByPk(questionId);

    const teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });
    let choices = await Choice.findOne({
      where: {
        question_id: questionId,
        correct_option: true,
      },
    });

    try {
      if (!teacher || userLevel > 2)
        return res.status(404).send({ error: "Professor não encontrado!" });

      if (!question)
        return res.status(404).send({ error: "Questão não encontrada!" });

      if (choices && correctOption) {
        return res
          .status(400)
          .send({ error: "Uma opção correta já foi inserida nessa Questão" });
      }

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

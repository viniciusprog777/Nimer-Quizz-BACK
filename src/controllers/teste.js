const Answer = require("../models/Answer");
const Choice = require("../models/Choice");
const Quizz = require("../models/Quizz");

module.exports = {
    async index(req, res){
        const {quizzId, choiceId} = req.body
        let quizz = await Quizz.findByPk(quizzId);

  let choice = await Choice.findByPk(choiceId);

  try {
    if (!choice)
      return res.status(404).send({ error: "Resposta não encontrada!" });

    if (!quizz) return res.status(400).send({ error: "Quizz não encontrado!" });

    const cont = await Answer.findAll({
      where:{
        quizz_id: quizzId
      },
      include: [
        {
          association: "Choice",
          where:{
            question_id: choice.question_id
          },
          attributes:[],
        }
      ]
    })
    return res.status(201).send(cont);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });

  }
    }
}
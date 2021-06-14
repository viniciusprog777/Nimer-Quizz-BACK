const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Quizz = require("../models/Quizz");
const Question = require("../models/Question");
const Choice = require("../models/Choice");

function createConnection(io) {
  io.on("connection", async (socket) => {
    console.log(`Nova conexão = ${socket.id}`);

    socket.on("prepareQuizz", async (quizz) => {
      const idQuizz = prepareQuizz(quizz);
      insertQuestions(idQuizz, quizz.questions);
    })
    socket.on("iniciateQuizz", async (quizz) => {
      iniciateQuizz(quizz);
    })
    socket.on("endQuizz", async (quizz) => {
      endQuizz(quizz);
    })
    socket.on("answerQuizz", async (answer) =>{
      answerQuizz(answer);
    })
  });

}

async function prepareQuizz(quizz) {
  let classes = await Class.findByPk(quizz.classId);
  const teacher = await Teacher.findOne({
    where: {
      user_id: quizz.userId,
    },
  });
  
  try {
    if (!teacher || quizz.userLevel > 2)
      return res.status(404).send({ error: "Professor não encontrado!" });

    if (!classes)
      return res.status(400).send({ error: "Turma não encontrada!" });
  
    const newQuizz = await teacher.createQuizz({
      title: quizz.title,
      status_quizz: "Em Preparação",
    });
  
    await classes.addQuizz(newQuizz);

    console.log("Quizz criado!");
    return newQuizz.id;

  } catch (error) {
    console.log(error);
  }
}
async function iniciateQuizz(upQuizz) {
  let quizz = await Quizz.findByPk(upQuizz.quizzId);

  const teacher = await Teacher.findOne({
    where:{
      user_id: upQuizz.userId
    }
    });

    try {
      if (!teacher || upQuizz.userLevel > 2)
        return res.status(404).send({ error: "Professor não encontrado!" });
            
      if (!quizz) return res.status(400).send({ error: "Quizz não encontrado!" });

      quizz.status_quizz = "Em andamento";

      quizz.save();

      console.log("Quizz Atualizado!");

    } catch (error) {
      console.log(error);
    }
}
async function endQuizz(upQuizz) {
  let quizz = await Quizz.findByPk(upQuizz.quizzId);

  const teacher = await Teacher.findOne({
       where:{
          user_id: upQuizz.userId
      }
  });

  try {
      if (!teacher || upQuizz.userLevel > 2)
          return res.status(404).send({ error: "Professor não encontrado!" });
            
      if (!quizz) return res.status(400).send({ error: "Quizz não encontrado!" });

      quizz.status_quizz = "Finalizado";

      quizz.save();

      console.log("Quizz Finalizado!");

  } catch (error) {
      console.log(error);
  }
}
async function insertQuestions(idQuizz, questions) {
  let quizz = await Quizz.findByPk(idQuizz);

  try {   
    if (!quizz) return res.status(400).send({ error: "Quizz não encontrado!" });

    questions.forEach(async q => {
      if (q.id === null) {
        const question = await Question.create({
          title: q.title,
          image: q.image
        });
        await question.setTeacher(q.idTeacher);
        q.choices.forEach(async c => {
          const choice = question.addChoice({
            description: c.description,
            image: c.image,
            correct_option: c.correctOption
          })
          await choice.setTeacher(q.idTeacher)
        });
        await quizz.addQuestion(question);

      } else {
        const question = await Question.findByPk(q.id);
        await quizz.addQuestion(question);
      }
    });

  } catch (error) {
    console.log(error);
  }
}
async function answerQuizz(answer) {
  
}

module.exports = { createConnection };

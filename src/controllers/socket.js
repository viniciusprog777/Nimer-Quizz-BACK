const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Quizz = require("../models/Quizz");
const Question = require("../models/Question");
const Choice = require("../models/Choice");
const Answer = require("../models/Answer");
const { Op, where } = require("sequelize");


function createConnection(io) {
  io.on("connection", async (socket) => {
    console.log(`Nova conexão = ${socket.id}`);
    console.log(socket.rooms);

    socket.on("prepareQuizz", async (quizz) => {
      const newQuizz = await prepareQuizz(quizz);
      insertQuestions(newQuizz.id, quizz.questions);
      socket.join(newQuizz.socket_id);
      console.log(socket.rooms);

    });
    socket.on("iniciateQuizz", async (quizz) => {
      const id = await iniciateQuizz(quizz);
      socket.to(id).emit("start");
    });
    socket.on("endQuizz", async (quizz) => {
      const id = await endQuizz(quizz);
      socket.to(id).emit("end");
    });
    socket.on("answerQuizz", async (answer) => {
      const id = await answerQuizz(answer);
      socket.to(id).emit("answer");
    });
    socket.on("enterQuizz", async (quizzId) => {
      const quizz = await Quizz.findByPk(quizzId.quizzId);
      const student = await Student.findOne({
        where: {
          user_id: quizzId.userId,
        },
        include: [
          {
            association: "Classes",
            where: {
              id: quizzId.classId,
            },
          },
        ],
      });

      try {
        if (!quizz) console.log("Quizz não encontrado!");

        if (!student) console.log("Aluno não encontrado!");

        socket.join(quizz.socket_id);
        socket.to(quizz.socket_id).emit(`${socket.id} entrou no Quizz`);
        console.log(socket.rooms.size);
      } catch (error) { 
        console.log(error);
      }
    });
    socket.on("quitQuizz", async (quizzId) => {
      const quizz = await Quizz.findByPk(quizzId);

      try {
        if (!quizz)
          return res.status(404).send({ error: "Quizz não encontrado!" });

        socket.to(quizz.socket_id).emit(`${socket.id} saiu do Quizz`);
        socket.leave(quizz.socket_id);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("showResult", async (result) => {
      const questions = await showResult(result);
      return questions;
    });
    socket.on("showResultAll", async (result) => {
      const questions = await showResultAll(result);
      return questions;
    });
    socket.on("nextQuestion", async (question) => {
      const q = await nextQuestion(question);
      if (!q) {
        socket.to(q.socket).emit("resNoQuestion");
      }
      if (q) {
        socket.to(q.socket).emit("resNextQuestion", q);
        socket.to(socket.id).emit("resNextQuestion", q);
      }
    });
    socket.on("responsesQuant", async (obj) =>{
      const cont = await responsesQuant(obj);
      if ((socket.rooms.size - 1) === cont.length()) 
        return true
      else
        return false
    })
  });
}

async function prepareQuizz(quizz) {
  let classes = await Class.findByPk(quizz.classId);
  const teacher = await Teacher.findOne({
    where: {
      user_id: quizz.userId,
    },
    include: [
      {
        association: "Courses",
        where: {
          id: classes.course_id,
        },
      },
    ],
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

    newQuizz.socket_id = `quizz-${newQuizz.id}`;
    newQuizz.save();

    await classes.addQuizz(newQuizz);

    console.log("Quizz criado!");
    return newQuizz;
  } catch (error) {
    console.log(error);
  }
}
async function iniciateQuizz(upQuizz) {
  let quizz = await Quizz.findByPk(upQuizz.quizzId);

  const teacher = await Teacher.findOne({
    where: {
      user_id: upQuizz.userId,
    },
  });

  try {
    if (!teacher || upQuizz.userLevel > 2)
      return res.status(404).send({ error: "Professor não encontrado!" });

    if (!quizz) return res.status(400).send({ error: "Quizz não encontrado!" });

    quizz.status_quizz = "Em andamento";

    quizz.save();

    console.log("Quizz Atualizado!");
    return quizz.socket_id;
  } catch (error) {
    console.log(error);
  }
}
async function endQuizz(upQuizz) {
  let quizz = await Quizz.findByPk(upQuizz.quizzId);

  const teacher = await Teacher.findOne({
    where: {
      user_id: upQuizz.userId,
    },
  });

  try {
    if (!teacher || upQuizz.userLevel > 2)
      return res.status(404).send({ error: "Professor não encontrado!" });

    if (!quizz) return res.status(400).send({ error: "Quizz não encontrado!" });

    quizz.status_quizz = "Finalizado";

    quizz.save();
    
    console.log("Quizz Finalizado!");
    return quizz.socket_id;
  } catch (error) {
    console.log(error);
  }
}
async function insertQuestions(idQuizz, questions) {
  let quizz = await Quizz.findByPk(idQuizz);

  try {
    if (!quizz) return res.status(400).send({ error: "Quizz não encontrado!" });

    questions.forEach(async (q) => {
      if (q.id === null) {
        const question = await Question.create({
          title: q.title,
          image: q.image,
        });
        await question.setTeacher(q.idTeacher);
        q.choices.forEach(async (c) => {
          const choice = question.addChoice({
            description: c.description,
            image: c.image,
            correct_option: c.correctOption,
          });
          await choice.setTeacher(q.idTeacher);
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
  console.log(answer.userId);
  let choice = await Choice.findByPk(answer.choiceId);
  let student = await Student.findOne({
    where:{
      user_id:answer.userId
    }
    });
  let quizz = await Quizz.findByPk(answer.quizzId);
  let oldAnswer = await Answer.findOne({
    where: {
      student_id: student.id,
      choice_id: answer.choiceId,
      quizz_id: answer.quizzId,
    },
  });

  try {
    if (!student)
      return res.status(404).send({ error: "Aluno não encontrado!" });
    if (!choice)
      return res.status(404).send({ error: "Escolha não encontrada!" });
    if (!quizz) return res.status(404).send({ error: "Quizz não encontrada!" });
    if (oldAnswer) {
      return console.log("Erro de conflito!");
    }

    await Answer.create({
      student_id: student.id,
      choice_id: answer.choiceId,
      quizz_id: answer.quizzId,
    });

    console.log("Escolha registrada");
    return quizz.socket_id;
  } catch (error) {
    console.log(error);
  }
}
async function showResult(result) {
  let quizz = await Quizz.findByPk(result.quizzId);
  const student = await Student.findOne({
    where: {
      user_id: result.userId,
    },
  });

  try {
    if (!student)
      return res.status(404).send({ error: "Estudante não encontrado!" });

    if (!quizz) return res.status(400).send({ error: "Quizz não encontrada!" });

    let questions = await Answer.findAll({
      where: {
        student_id: student.id,
        quizz_id: result.quizzId,
      },
      include: [
        {
          association: "Choice",
          attributes: ["id", "correct_option"],
          where: {
            correct_option: true,
          },
        },
      ],
    });
    // let questions = await Quizz.findAll({
    //   where: {
    //     id: quizz.id,
    //   },
    //   include: [
    //     {
    //       association: "Questions",
    //       include: [
    //         {
    //           association: "Choices",
    //           attributes: ["id", "correct_option"],
    //           where: {
    //             correct_option: true,
    //           },
    //              {
    //                      association: "Answer",
    //           //     where: {
    //           //       student_id: student.id,
    //           //     },
    //           //   },
    //              }
    //           // include: [
    //           //   {
    //           //
    //           // ],
    //         },
    //       ],
    //     },
    //   ],
    // });
    return questions;
  } catch (error) {
    console.log(error);
  }
}
async function showResultAll(result) {
  let quizz = await Quizz.findByPk(result.quizzId);
  const teacher = await Teacher.findOne({
    where: {
      user_id: result.userId,
    },
  });

  try {
    if (!teacher)
      return res.status(404).send({ error: "Teacher não encontrado!" });

    if (!quizz) return res.status(400).send({ error: "Quizz não encontrada!" });

    let questions = await Answer.findAll({
      where: {
        quizz_id: result.quizzId,
      },
      include: [
        {
          association: "Choice",
          attributes: ["id", "correct_option"],
          where: {
            correct_option: true,
          },
        },
      ],
    });
    return questions;
  } catch (error) {
    console.log(error);
  }
}
async function nextQuestion(question) {
  let quizz = await Quizz.findByPk(question.quizzId);
  let teacher = await Teacher.findOne({
    where: {
      user_id: question.userId,
    },
  });
  try {
    if (!teacher)
      return res.status(404).send({ error: "Professor não encontrado!" });

    if (!quizz) return res.status(400).send({ error: "Quizz não encontrado!" });

    console.log(question)

    let nextQuestion = await Question.findOne({
      where:{
        id:{
          [Op.gt]: question.questionId,
        }
      },
      include: [
        {
          association: "Choices",
        },
      ],
      include:[
        {
          association: "Quizzs",
          where:{
            id: question.quizzId
          }
        }
      ]
    });
    console.log(nextQuestion)
    if (!nextQuestion) {
      return false
    }
    const choices = await nextQuestion.getChoices();
    return {nextQuestion,choices, socket: quizz.socket_id};
  } catch (error) {
    console.log(error);
  }
}
async function responsesQuant(obj) {
  let quizz = await Quizz.findByPk(obj.quizzId);

  let choice = await Choice.findByPk(obj.choiceId);

  try {
    if (!choice)
      return res.status(404).send({ error: "Resposta não encontrada!" });

    if (!quizz) return res.status(400).send({ error: "Quizz não encontrado!" });

    const cont = await Answer.findAll({
      where:{
        quizz_id: obj.quizzId
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
    return cont 
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createConnection };

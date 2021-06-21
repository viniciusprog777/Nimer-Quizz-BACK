const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Quizz = require("../models/Quizz");
const Question = require("../models/Question");
const Choice = require("../models/Choice");
const Answer = require("../models/Answer");

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
      iniciateQuizz(quizz);
    });
    socket.on("endQuizz", async (quizz) => {
      endQuizz(quizz);
    });
    socket.on("answerQuizz", async (answer) => {
      answerQuizz(answer);
    });
    socket.on("enterQuizz", async (quizzId) => {
      const quizz = await Quizz.findByPk(quizzId.quizzId);
      const student = await Student.findOne({
        where:{
          user_id: quizzId.userId
        },
        include:[
          {
            association: "Classes",
            where:{
              id: quizzId.classId
            }
          }
        ]
      })

      try {
        if (!quizz)
         console.log("Quizz não encontrado!" );
         
         if (!student) 
           console.log("Aluno não encontrado!" );
           

        socket.join(quizz.socket_id);
        socket.to(quizz.socket_id).emit(`${socket.id} entrou no Quizz`);
        console.log(socket.rooms.size);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("quitQuizz", async (quizzId) =>{
      const quizz = await Quizz.findByPk(quizzId);

      try {
        if (!quizz)
          return res.status(404).send({ error: "Quizz não encontrado!" });
        
        socket.to(quizz.socket_id).emit(`${socket.id} saiu do Quizz`);
        socket.leave(quizz.socket_id);
      } catch (error) {
        console.log(error);
      }
    })
    socket.on("showResult", async (result) => {
      showResult(result);
    });
  });
}

async function prepareQuizz(quizz) {
  let classes = await Class.findByPk(quizz.classId);
  const teacher = await Teacher.findOne({
    where: {
      user_id: quizz.userId,
    },
    include:[
        {
            association: "Courses",
            where:{
                id: classes.course_id
            }
        }
    ]
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
  console.log(answer.studentId);
  let choice = await Choice.findByPk(answer.choiceId);
  let student = await Student.findByPk(answer.studentId);
  let quizz = await Quizz.findByPk(answer.quizzId);
  let oldAnswer = await Answer.findOne({
    where:{
      student_id: answer.studentId,
      choice_id: answer.choiceId,
      quizz_id: answer.quizzId,
    }
  })
  

  try {
    if (!student)
      return res.status(404).send({ error: "Aluno não encontrado!" });
    if (!choice)
      return res.status(404).send({ error: "Escolha não encontrada!" });
    if (!quizz)
      return res.status(404).send({ error: "Quizz não encontrada!" });
    if (oldAnswer) {
      return console.log("Erro de conflito!")
    }

    await Answer.create({
      student_id: answer.studentId,
      choice_id: answer.choiceId,
      quizz_id: answer.quizzId,
    })
    

    console.log("Escolha registrada");
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
      where:{
        student_id: student.id,
        quizz_id: result.quizzId
      },
      include: [
        {
          association: "Choice",
          attributes: ["id", "correct_option"],
          where:{
            correct_option: true
          }
        }
      ]
    })
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
    //           // include: [
    //           //   {
    //           //     association: "Answer",
    //           //     where: {
    //           //       student_id: student.id,
    //           //     },
    //           //   },
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

module.exports = { createConnection };
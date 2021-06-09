// const { io } = require("../app");

const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Quizz = require("../models/Quizz");

function createConnection(io) {
  io.on("connection", async (socket) => {
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

    console.log(`Nova conexão = ${socket.id}`);

    socket.on("mensagem", async (mensagem) => {
      console.log(mensagem);

      await inicializarQuiz();

      socket.emit("comecar", "Mensagem recebida, ok!!!");
    });

    socket.on("comecar", async (mensagem) => {
      console.log(mensagem);

      socket.emit("ok", "Mensagem recebida, ok!!!");
    });
  });
}

async function inicializarQuiz() {}

module.exports = { createConnection };

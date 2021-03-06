const Class = require("../models/Class");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports = {
  async index(req, res) {
    const { userId } = req.user;
    const courseId = req.params.id;

    const student = await Student.findOne({
      where: {
        user_id: userId,
      },
    });

    try {
      const classes = await Class.findAll({
        include:[{
          association: "Students",
          where:{
            student_id: student.id
          },
          attributes: [],
          through: { attributes: [] },
        }],
        include:[{
          association: "Course",
          where:{
            id: courseId
          },
          attributes: []
        }]
      });

      res.send(classes);
    } catch (error) {
      console.log(error);
    }
  },
  async store(req, res) {
    const { students } = req.body;
    const { userId, userLevel } = req.user;
    const classId = req.params.id;

    const studentsArr = students.split(",");

    let classes = await Class.findByPk(classId);
    const teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });

    let newStudent;

    console.log(newStudent);
    try {
      if (!teacher || userLevel > 2)
        return res.status(404).send({ error: "Professor não encontrado!" });

      if (!classes)
        return res.status(400).send({ error: "Classe não encontrada!" });

      // if (!newStudent)
      //   return res.status(400).send({ error: "Nenhum Estudante cadastrado no curso!" });

      studentsArr.forEach(async (e) => {
        let s = await Student.findOne({
          where: {
            id: e,
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

        await classes.addStudent(s);
      });

      return res.status(201).send("Alunos Adicionados");
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

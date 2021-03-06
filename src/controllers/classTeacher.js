const Teacher = require("../models/Teacher");
const Class = require("../models/Class");

module.exports = {
  async index(req, res) {
    const { userId } = req.user;
    const courseId = req.params.id;

    let teacher = await Teacher.findOne({
      where: {
        user_id: userId,
      },
    });

    try {
      if (!teacher)
        return res.status(404).send({ error: "Professor não encontrado!" });

      const classes = await Class.findAll({
        where: {
          teacher_id: teacher.id,
        },
        include:[{
          association: "Course",
          where:{
            id: courseId
          },
          attributes: []
        }]
      });
      return res.status(201).send(classes);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

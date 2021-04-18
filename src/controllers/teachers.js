const Institution = require("../models/Institution");
const Teacher = require("../models/Teacher");
const User = require("../models/User")

module.exports = {
    async index(req, res) {
        try {
            const teachers = await Teacher.findAll();
      
            res.status(200).send(teachers);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
          }
    },
    async store(req, res){
        const { name, email, password, dateBirthday} = req.body;

        let teacher = await Teacher.findOne({
            where: {
              email: email,
            }
        });
        const institution = await Institution.findByPk(1);

        if (!institution)
          return res.status(404).send({ error: "Instituição não encontrado!" });

        if (teacher) return res.status(400).send({ error: "Usuario existente!" });
        try {

            teacher = await User.create({
                name,
                email,
                password,
                description: 2
              });
            await teacher.addInstitution(institution);

            await teacher.createTeacher({
              date_birthday: dateBirthday,

            });

              return res.status(201).send(teacher);

        } catch (error) {
            return res.status(500).send(error);
        }
    },
    async find(req, res){
        const id  = req.params.id

        let teacher = await Teacher.findByPk(id, {
            attributes: ["id", "name", "email", "date_birthday"],
          });
          try {
            if (teacher) return res.status(200).send(teacher);
            return res.status(400).send({ error: "Professor não encontrado!" });
          } catch (error) {
            return res.status(500).send(error);
          }
    }
}
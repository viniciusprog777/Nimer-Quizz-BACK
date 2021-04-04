const Teacher = require("../models/Teacher");

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
        try {
            if (teacher) return res.status(400).send({ error: "Usuario existente!" });

            teacher = await Teacher.create({
                name,
                email,
                password,
                date_birthday: dateBirthday
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
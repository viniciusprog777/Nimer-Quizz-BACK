const Student = require("../models/Student");

module.exports = {
    async index(req, res) {
        try {
            const students = await Student.findAll();
            
            res.status(200).send(students);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
          }
    },
    async store(req, res){
        const { name, email, password, dateBirthday} = req.body;

        let student = await Student.findOne({
            where: {
              email: email,
            }
        });
        try {
            if (student) return res.status(400).send({ error: "Usuario existente!" });

            student = await Student.create({
                name,
                email,
                password,
                date_birthday: dateBirthday
              });

              return res.status(201).send(student);

        } catch (error) {
            return res.status(500).send(error);
        }
    }, 
    async find(req, res){
        const id  = req.params.id

        let student = await Student.findByPk(id, {
            attributes: ["id", "name", "email", "date_birthday"],
          });
          try {
            if (student) return res.status(200).send(student);
            return res.status(400).send({ error: "Aluno não encontrado!" });
          } catch (error) {
            return res.status(500).send(error);
          }
    }
}
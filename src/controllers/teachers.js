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
    }
}
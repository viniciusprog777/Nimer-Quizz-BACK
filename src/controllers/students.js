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
    }
}
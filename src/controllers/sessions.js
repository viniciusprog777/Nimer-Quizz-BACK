const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Instituion = require("../models/Institution");

module.exports = {
    async store(req, res){
        const { email, password } = req.body;

        try {
            let user = await Instituion.findOne({
                where: {
                  email: email,
                  password: password
                }
            });
            if (user) return res.status(200).send(user);
            user = await Teacher.findOne({
                where: {
                  email: email,
                  password: password
                }
            });
            if (user) return res.status(200).send(user);
            user = await Student.findOne({
                where: {
                  email: email,
                  password: password
                }
            });
            if (user) return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}
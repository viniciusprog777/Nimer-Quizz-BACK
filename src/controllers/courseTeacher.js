const Class = require("../models/Class");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports = {
    async index(req, res){
        const classId = req.params.id;
        const { userId, userLevel } = req;
        let classes = await Class.findByPk(classId);
        const student = await Student.findOne({
            where:{
              user_id: userId
            },
            include:[
              {
                association: "Classes",
                where:{
                  id: classId
                }
              }
            ]
          })
        return res.status(201).send(student);

    }
}
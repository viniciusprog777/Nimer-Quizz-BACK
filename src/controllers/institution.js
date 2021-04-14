const Institution = require("../models/Institution");
const Student = require("../models/Student");

module.exports = {
    async index(req, res){
        try {
            const institutions = await Institution.findAll();
            
            res.status(200).send(institutions);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
          }
    },
    async store(req, res){
        const {name, email, password} = req.body

        let institution = await Institution.findOne({
            where: {
              email: email,
            }
        });
    
        try {
            if (institution) return res.status(400).send({ error: "Usuario existente!" });
           
            
            institution = await Institution.create({
                name,
                email,
                password
            });
            
            
            return res.status(201).send(institution);

        } catch (error) {
            return res.status(500).send(error);
        }
    }
}
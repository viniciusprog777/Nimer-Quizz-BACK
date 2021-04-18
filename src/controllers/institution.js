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
        const {name, email, password, company, cnpj} = req.body

        let institution = await Institution.findOne({
            where: {
              email: email,
            }
        });
    
        try {
            if (institution) return res.status(400).send({ error: "Usuario existente!" });
           
            
            institution = await User.create({
                name,
                email,
                password,
                description: 1
              });
            await institution.createInstitution({
                company_name: company,
                cnpj
            });
            
            
            return res.status(201).send(institution);

        } catch (error) {
            return res.status(500).send(error);
        }
    }
}
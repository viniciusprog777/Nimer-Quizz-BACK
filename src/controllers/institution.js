const Institution = require("../models/Institution");
const Student = require("../models/Student");
const Contract = require("../models/Contract");
const Level = require("../models/Level");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const institutions = await User.findAll({
        order: [["created_at", "DESC"]],
        where:{
          level_id: 1,
        },
        attributes: [
          "id",
          "name",
          "email",
          "image",
          "created_at",
        ],
        include: [
          {
            association: "Institution",
            attributes: ["id", "cnpj", "company_name"],
          },
        ]
        });

      res.status(200).send(institutions);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async store(req, res) {
    const {
      name,
      email,
      password,
      image,
      company,
      cnpj,
      cardNumber,
      cardPassword,
      cardCodeSecurity,
    } = req.body;

    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    
    const level = await Level.findByPk(1);

    try {
      if (user)
        return res.status(400).send({ error: "Usuario existente!" });

      const passwordCript = bcrypt.hashSync(password);

      user = await level.createUser({
        name,
        email,
        password: passwordCript,
        image,
        status: 1,
      });
      await user.createInstitution({
        company_name: company,
        cnpj: cnpj,
      });

      let institution = await Institution.findOne({
        where: {
          user_id: user.id,
        },
      });

      const contract = await institution.createContract({
        contract_number: "12124-21213",
        card_number: cardNumber,
        card_code: cardCodeSecurity,
        status_contract: 1,
      });

      return res.status(201).send({
        user,
        institution,
        contract,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

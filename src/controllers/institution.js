const Institution = require("../models/Institution");
const Student = require("../models/Student");
const Contract = require("../models/Contract");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const institutions = await Institution.findAll();

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

    let institution = await User.findOne({
      where: {
        email: email,
      },
    });

    try {
      if (institution)
        return res.status(400).send({ error: "Usuario existente!" });

      const passwordCript = bcrypt.hashSync(password);

      institution = await User.create({
        name,
        email,
        password: passwordCript,
        image,
        status: 1,
      });
      await institution.createInstitution({
        company_name: company,
        cnpj: cnpj,
      });
      await institution.getLevel(1);

      let institution02 = await Institution.findOne({
        where: {
          user_id: institution.id,
        },
      });

      let contract = await institution02.createContract({
        contract_number: "12123-21213",
        card_number: cardNumber,
        card_code: cardCodeSecurity,
        status_contract: 1,
      });

      return res.status(201).send({
        institution,
        institution02,
        contract,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

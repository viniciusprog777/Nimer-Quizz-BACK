const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../util");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user || !bcrypt.compareSync(password, user.password) || user.status === 0)
        return res.status(403).send({ error: "Usuário e/ou senha inválidos" });

      const token = generateToken({
        userId: user.id,
        userLevel: user.level_id,
        userEmail: user.email
      });
      res.status(201).send({
        user: {
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          userLevel: user.level_id,
        },
        token,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

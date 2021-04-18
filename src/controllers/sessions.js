const User = require("../models/User")

module.exports = {
    async store(req, res){
        const { email, password } = req.body;

        try {
            let user = await User.findOne({
                where: {
                  email: email,
                  password: password
                }
            });
            return res.status(201).send(user);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}
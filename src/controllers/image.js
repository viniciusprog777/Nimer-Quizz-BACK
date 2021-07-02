const User = require("../models/User");

module.exports = {
    async store(req, res){
        const {userId} = req.user;

        const {firebaseUrl} = req.file;

        const user = await User.findByPk(userId);

        if (!firebaseUrl)
            return res.status(400).send({ error: "Campo imagem é obrigatório" });
        if (!user)
            return res.status(404).send({ error: "Usuario não encontrado!" });
        
            try {
                user.image = firebaseUrl;
          
                user.save();
          
                res.status(201).send({
                  userId,
                  image: firebaseUrl,
                });
              } catch (error) {
                res.status(500).send({ error });
              }

    }
}
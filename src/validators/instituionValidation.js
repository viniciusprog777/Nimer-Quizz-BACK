const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(3).max(255),
      email: Joi.string().required().min(8).max(255).email(),
      password: Joi.string().required().min(6).max(255),
      company: Joi.string().required().min(1).max(255),
      cnpj: Joi.string().required().length(20),
      image: Joi.string(),
      cardNumber: Joi.string().required().length(19),
      cardPassword: Joi.string().required().length(6),
      cardCodeSecurity: Joi.string().required().length(3),
    }),
  }),
};

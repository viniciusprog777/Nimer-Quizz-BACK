const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(3).max(255),
      description: Joi.string().required().min(1).max(255),
      image: Joi.string(),
    }),
  }),
};

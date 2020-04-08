const { celebrate, Joi } = require('celebrate');

const urlRegExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
// validators vor /users route
const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

// validators for /articles route
const createArticleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(1).max(30),
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
    // date: Joi.string().required(),
    source: Joi.string().required().min(1),
    link: Joi.string().required().regex(urlRegExp).error(new Error('link is not a link!')),
    image: Joi.string().required().regex(urlRegExp).error(new Error('image is not a link!')),
  }),
});

const deleteArticleValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  createArticleValidation,
  deleteArticleValidation,
};

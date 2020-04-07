const Article = require('../models/article');
const BadRequestError = require('../errorsModules/BadRequestError');
const NotFoundError = require('../errorsModules/NotFoundError');
const NoRightsError = require('../errorsModules/NoRightsError');
const constants = require('../constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id }).orFail(new NotFoundError(constants.errors.NO_DOC))
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner').orFail(new NotFoundError(constants.errors.NO_DOC))
    .then((article) => {
      if (!article.owner._id.equals(req.user._id)) {
        throw new NoRightsError(constants.errors.NO_RIGHTS_DOC);
      }
      Article.remove(article)
        .then(() => res.send({
          message: 'Документ удалён.',
        }));
    })
    .catch(next);
};

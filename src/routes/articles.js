const router = require('express').Router();
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');
const { createArticleValidation, deleteArticleValidation } = require('../middlewares/validation');

router.post('/articles', createArticleValidation, createArticle);
router.get('/articles', getArticles);
router.delete('/articles/:articleId', deleteArticleValidation, deleteArticle);

module.exports = router;

const Article = require('./articles.schema');

const createArticle = async (articleData) => {
  try {
    const article = new Article(articleData);
    await article.save();
    return article;
  } catch (error) {
    throw error;
  }
};

const updateArticle = async (articleId, articleData) => {
  try {
    const article = await Article.findByIdAndUpdate(articleId, articleData, { new: true });
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  } catch (error) {
    throw error;
  }
};

const deleteArticle = async (articleId) => {
  try {
    const article = await Article.findByIdAndDelete(articleId);
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  } catch (error) {
    throw error;
  }
};
const findArticlesByUserId = async (userId) => {
    try {
      const articles = await Article.find({ user: userId }).populate('user', '-password');
      return articles;
    } catch (error) {
      throw error;
    }
  };

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  findArticlesByUserId
};

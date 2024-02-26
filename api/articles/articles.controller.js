// articles.controller.js

const articlesService = require('./articles.service');
const io = require('../socket').getIO();

// Création d'un article
const createArticle = async (req, res) => {
    try {
      const articleData = {
        ...req.body,
        user: req.user._id // Utilisation de l'ID de l'utilisateur connecté
      };
      const article = await articlesService.createArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Mise à jour d'un article
const updateArticle = async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Only admins can perform this action.' });
    }
  
    try {
      const article = await articlesService.updateArticle(req.params.id, req.body);
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Suppression d'un article
  const deleteArticle = async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Only admins can perform this action.' });
    }
  
    try {
      await articlesService.deleteArticle(req.params.id);
      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle
};

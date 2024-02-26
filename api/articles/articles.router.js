const express = require('express');
const router = express.Router();
const articlesController = require('./articles.controller');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');


router.post('/', isAuthenticated, articlesController.createArticle);


router.put('/:id', isAuthenticated, isAdmin, articlesController.updateArticle);


router.delete('/:id', isAuthenticated, isAdmin, articlesController.deleteArticle);

module.exports = router;

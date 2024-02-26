const supertest = require('supertest');
const mockingoose = require('mockingoose').default;
const app = require('../app');
const Article = require('../models/article.schema');

describe('Articles API', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should create an article and return 201 status code', async () => {
        const articleData = { title: 'New Article', content: 'Article content', user: 'user123' };

        mockingoose(Article).toReturn(articleData, 'save');

        const response = await supertest(app)
            .post('/api/articles')
            .send(articleData);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toEqual(articleData.title);
    });

    it('should update an article and return 200 status code', async () => {
        const articleData = { title: 'Updated Article', content: 'Updated content' };
        const articleId = 'someArticleId';

        mockingoose(Article).toReturn(articleData, 'findOneAndUpdate');

        const response = await supertest(app)
            .put(`/api/articles/${articleId}`)
            .send(articleData);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toEqual(articleData.title);
    });

    it('should delete an article and return 200 status code', async () => {
        const articleId = 'someArticleId';

        mockingoose(Article).toReturn(null, 'findOneAndDelete');

        const response = await supertest(app)
            .delete(`/api/articles/${articleId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Article deleted successfully');
    });
});

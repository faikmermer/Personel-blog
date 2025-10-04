import express from 'express';
import *  as controller from '../controllers/controller';
import { authMiddleware } from '../middleware/middleAuth';
const router = express.Router();

router.get('/login', controller.getLoginPage);
router.post('/login', controller.postLogin);
router.get('/home', controller.getHomePage);

router.get('/article/:id', authMiddleware, controller.getArticlePage);
router.get('/admin/dashboard', authMiddleware, controller.getDashboardPage);
router.get('/admin/add-article/new', authMiddleware, controller.getAddArticlePage);
router.get('/admin/edit-article/:id', authMiddleware, controller.getEditArticle);
router.post('/admin/delete-article/:id', authMiddleware, controller.postDeleteArticle);
router.post('/admin/add-article/new', authMiddleware,  controller.postAddArticle);
router.post('/admin/edit-article/:id', authMiddleware,  controller.postEditArticle);
router.get('/admin/delete-article/:id', authMiddleware,  controller.getDeleteArticle);


export default router;
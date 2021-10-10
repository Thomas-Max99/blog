import express from 'express';
import categorieController from '../controllers/categorieController.js';
const router = express.Router();

router.route('/categorie/')
      .post(categorieController.createCategorie)
      .get(categorieController.getAllCategories)
router.route('/categorie/:id')
      .get(categorieController.getCategorieById)
      .put(categorieController.updateCategorie)
      ,delete(categorieController.deleteCategorie)

export default router;
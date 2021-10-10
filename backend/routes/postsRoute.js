import express from 'express';
import postController from '../controllers/postsController.js';
import authController from '../controllers/authController.js';
const router=express.Router();

router.route('/post')
      .post(postController.createPost)
      .get(postController.getAllPosts);
router.route('/post/:id')
      .get(postController.getPostById)
      .put(postController.updatePost)
      .delete(postController.deletePost);

export default router;


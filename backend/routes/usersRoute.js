import express from 'express';
import userController from '../controllers/usersController.js';
const router= express.Router();

router.route('/users')
      .post(userController.createUser)
      .get(userController.getAllUsers)
router.route('/users/:id')
      .get(userController.getUserById)
      .put(userController.updateUser)
      .delete(userController.deleteUser)
export default router;
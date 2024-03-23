
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const authMiddleware=require('../middlewares/authMiddleware')

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/profile', authMiddleware, authController.profile);

module.exports = router;

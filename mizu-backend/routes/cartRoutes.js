import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

// Get the cart by user ID
router.get('/:userId', cartController.getCartByUser);

// Add to the cart
router.post('/', cartController.addToCart);

export default router;

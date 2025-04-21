import express from 'express';
import {
    getCartByUser,
    addToCart,
    deleteCartItem
  } from '../controllers/cartController.js';

const router = express.Router();

// Get the cart by user ID
router.get('/:userId', getCartByUser);

// Add to the cart
router.post('/', addToCart);

router.delete('/:id', deleteCartItem);

export default router;

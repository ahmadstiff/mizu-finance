import express from 'express';
import {
    getCartByUser,
    addToCart,
    deleteCartItem
  } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getCartByUser);
router.post('/', addToCart);
router.delete('/:id', deleteCartItem);

export default router;

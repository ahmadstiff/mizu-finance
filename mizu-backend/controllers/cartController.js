// Import PrismaClient
import prisma from '../prisma/client.js';
import { Prisma } from '@prisma/client';

// Get all carts for a user
export const getCartByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { nft: true }
    });
    res.json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    let message = 'Failed to fetch cart';
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      message += ` (Code: ${err.code})`;
    }
    res.status(500).json({ error: message, details: err.message });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  const { userId, nftId, quantity } = req.body;

  // Validasi sederhana
  if (!userId || !nftId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields: userId, nftId, quantity' });
  }

  try {
    const cartItem = await prisma.cart.create({
      data: {
        userId,
        nftId,
        quantity
      }
    });
    res.status(201).json(cartItem);
  } catch (err) {
    console.error('Error adding to cart:', err);

    let statusCode = 500;
    let message = 'Failed to add to cart';

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2003':
          // Foreign key constraint failed (e.g., nftId or userId doesn't exist)
          statusCode = 400;
          message = 'Invalid userId or nftId (foreign key constraint failed)';
          break;
        case 'P2002':
          // Unique constraint (if you have composite key like userId + nftId)
          statusCode = 409;
          message = 'This item is already in the cart';
          break;
        default:
          message += ` (Code: ${err.code})`;
      }
    }

    res.status(statusCode).json({ error: message, details: err.message });
  }
};

// Delete cart item by ID
export const deleteCartItem = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.cart.delete({
        where: {
          id: parseInt(id),
        },
      });
  
      res.json({ message: 'Cart item deleted successfully' });
    } catch (err) {
      console.error('Error deleting cart item:', err);
  
      let statusCode = 500;
      let message = 'Failed to delete cart item';
  
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          // Record not found
          statusCode = 404;
          message = 'Cart item not found';
        } else {
          message += ` (Code: ${err.code})`;
        }
      }
  
      res.status(statusCode).json({ error: message, details: err.message });
    }
  };
  
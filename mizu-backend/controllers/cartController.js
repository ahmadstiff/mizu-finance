// Import PrismaClient
import prisma from '../prisma/client.js'; 

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
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  const { userId, nftId, quantity } = req.body;
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
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

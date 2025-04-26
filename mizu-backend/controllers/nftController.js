import prisma from '../prisma/client.js';
import { Prisma } from '@prisma/client';

// Get all NFTs (with optional search)
export const getAllNFTs = async (req, res) => {
  const { search } = req.query;

  try {
    const nfts = await prisma.nFT.findMany({
      where: search
        ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { owner: { contains: search, mode: 'insensitive' } },
          ]
        }
        : undefined,
    });

    res.json(nfts);
  } catch (err) {
    console.error('Error fetching NFTs:', err);
    const message =
      err instanceof Prisma.PrismaClientKnownRequestError
        ? `Failed to fetch NFTs (Code: ${err.code})`
        : 'Failed to fetch NFTs';

    res.status(500).json({ error: message, details: err.message });
  }
};

// Get NFT by ID
export const getNFTById = async (req, res) => {
  const { id } = req.params;

  try {
    const nft = await prisma.nFT.findUnique({
      where: { id: parseInt(id) },
    });

    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    res.json(nft);
  } catch (err) {
    console.error('Error fetching NFT by ID:', err);
    res.status(500).json({ error: 'Failed to fetch NFT by ID', details: err.message });
  }
};

// Create new NFT
export const createNFT = async (req, res) => {
  const {
    title,
    description,
    owner,
    nftId,
    nftAddress,
    thumbnail,
    imageUrl,
    price,
    currency,
    category,
    status
  } = req.body;

  if (!title || !description || !owner || !nftId || !nftAddress || !thumbnail || !imageUrl || !price || !currency || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newNFT = await prisma.nFT.create({
      data: {
        title,
        description,
        owner,
        nftId,
        tags,
        nftAddress,
        thumbnail,
        imageUrl,
        price,
        currency,
        category,
        status: status || 'LISTED', // Default to LISTED if not provided
      },
    });

    res.status(201).json(newNFT);
  } catch (err) {
    console.error('Error creating NFT:', err);

    let statusCode = 500;
    let message = 'Failed to create NFT';

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2002':
          statusCode = 409;
          message = 'NFT with this ID or address already exists (duplicate key)';
          break;
        case 'P2003':
          statusCode = 400;
          message = 'Invalid foreign key reference';
          break;
        default:
          message += ` (Code: ${err.code})`;
      }
    }

    res.status(statusCode).json({ error: message, details: err.message });
  }
};

// Update NFT
export const updateNFT = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    nftId,
    nftAddress,
    price,
    category,
    status
  } = req.body;

  try {
    const updatedNFT = await prisma.nFT.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        nftId,
        nftAddress,
        price,

        category,
        status,
      },
    });

    res.json(updatedNFT);
  } catch (err) {
    console.error('Error updating NFT:', err);

    let statusCode = 500;
    let message = 'Failed to update NFT';

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2025':
          statusCode = 404;
          message = 'NFT not found';
          break;
        case 'P2002':
          statusCode = 409;
          message = 'Duplicate unique field value';
          break;
        default:
          message += ` (Code: ${err.code})`;
      }
    }

    res.status(statusCode).json({ error: message, details: err.message });
  }
};

// Delete NFT
export const deleteNFT = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.nFT.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: 'NFT deleted successfully' });
  } catch (err) {
    console.error('Error deleting NFT:', err);

    let statusCode = 500;
    let message = 'Failed to delete NFT';

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        statusCode = 404;
        message = 'NFT not found';
      } else {
        message += ` (Code: ${err.code})`;
      }
    }

    res.status(statusCode).json({ error: message, details: err.message });
  }
};
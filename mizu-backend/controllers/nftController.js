import prisma from '../prisma/client.js';

// Get all NFTs
export const getAllNFTs = async (req, res) => {
  try {
    const nfts = await prisma.nFT.findMany();
    res.json(nfts);
  } catch (err) {
    console.error('Error fetching NFTs:', err);

    let message = 'Failed to fetch NFTs';

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      message += ` (Code: ${err.code})`;
    }

    res.status(500).json({ error: message, details: err.message });
  }
};

// Create new NFT
export const createNFT = async (req, res) => {
  const { title, description, owner, nftId, nftAddress, imageUrl, price, currency, status } = req.body;

  // Validasi sederhana
  if (!title || !description || !owner || !nftId || !nftAddress || !imageUrl || !price || !currency || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newNFT = await prisma.nFT.create({
      data: {
        title,
        description,
        owner,
        nftId,
        nftAddress,
        imageUrl,
        price,
        currency,
        status,
      },
    });

    res.status(201).json(newNFT);
  } catch (err) {
    console.error('Error creating NFT:', err);

    let statusCode = 500;
    let message = 'Failed to create NFT';

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma error code documentation: https://www.prisma.io/docs/reference/api-reference/error-reference
      switch (err.code) {
        case 'P2002': // Unique constraint failed
          statusCode = 409;
          message = 'NFT with this ID or address already exists (duplicate key)';
          break;
        case 'P2003': // Foreign key constraint failed
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

// edit nft
export const updateNFT = async (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      owner,
      nftId,
      nftAddress,
      imageUrl,
      price,
      currency,
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
          owner,
          nftId,
          nftAddress,
          imageUrl,
          price,
          currency,
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
            message = 'Duplicate unique field value (e.g., nftId or nftAddress already used)';
            break;
          default:
            message += ` (Code: ${err.code})`;
        }
      }
  
      res.status(statusCode).json({ error: message, details: err.message });
    }
  };
  
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
  
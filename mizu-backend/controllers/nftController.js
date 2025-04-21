import prisma from '../prisma/client.js'; 

// Get all NFTs
export const getAllNFTs = async (req, res) => {
    try {
      const nfts = await prisma.nFT.findMany();  // Correct model name: `nFT`
      res.json(nfts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch NFTs', details: err.message });
    }
  };
  
  // Create new NFT
  export const createNFT = async (req, res) => {
    const { title, description, owner, nftId, nftAddress, imageUrl, price, currency, status } = req.body;
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
      console.error(err);
      res.status(500).json({ error: 'Failed to create NFT', details: err.message });
    }
  };
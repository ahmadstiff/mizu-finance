import express from 'express';
import {
  getAllNFTs,
  createNFT,
  updateNFT,
  deleteNFT
} from '../controllers/nftController.js';

const router = express.Router();

router.get('/', getAllNFTs);
router.post('/', createNFT);
router.put('/:id', updateNFT);    // ⬅️ Update NFT
router.delete('/:id', deleteNFT); // ⬅️ Delete NFT

export default router;
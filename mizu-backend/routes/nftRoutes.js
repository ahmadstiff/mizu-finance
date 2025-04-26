import express from 'express';
import {
  getAllNFTs,
  getNFTById,
  createNFT,
  updateNFT,
  deleteNFT
} from '../controllers/nftController.js';

const router = express.Router();

router.get('/', getAllNFTs);
router.get('/:id', getNFTById);
router.post('/', createNFT);
router.put('/:id', updateNFT);
router.delete('/:id', deleteNFT);

export default router;

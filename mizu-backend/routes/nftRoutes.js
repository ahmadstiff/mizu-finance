import express from 'express';
import * as nftController from '../controllers/nftController.js';

const router = express.Router();

router.get('/', nftController.getAllNFTs);
router.post('/', nftController.createNFT);


export default router;

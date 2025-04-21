import express from 'express';
import cors from 'cors';
import nftRoutes from './routes/nftRoutes.js';
import cartRoutes from './routes/cartRoutes.js';


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/nfts', nftRoutes);
app.use('/api/carts', cartRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

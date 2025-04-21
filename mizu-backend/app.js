import express from 'express';
import cors from 'cors';
import nftRoutes from './routes/nftRoutes.js';
import cartRoutes from './routes/cartRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/nfts', nftRoutes);
app.use('/api/carts', cartRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;

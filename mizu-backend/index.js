import express from 'express';
import cors from 'cors';
import nftRoutes from './routes/nftRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://mizu-finance.vercel.app',
    /\.vercel\.app$/  // Allow all Vercel preview deployments
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api/nfts', nftRoutes);
app.use('/api/carts', cartRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

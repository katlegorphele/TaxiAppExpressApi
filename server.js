import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import next from 'next';
import { connect } from 'mongoose';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
import { specs, swaggerUi } from './swagger.js';


//import routes
import apiRoutes from './apiRoutes.js';

// Connect to MongoDB
connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

// Create the server instance
app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(json());
  // Generate swagger-ui ui
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  //API Routes
  server.use('/api',apiRoutes);

  // Handle Next.js Pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});


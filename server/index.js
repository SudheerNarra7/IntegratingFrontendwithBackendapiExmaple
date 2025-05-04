import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import path from 'path';

// Import route controllers
import usersController from './controllers/usersController.js';
import productsController from './controllers/productsController.js';
import authController from './controllers/authController.js';
import swaggerDocument from './swagger.js';

// Create Express server
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/v1/users', usersController);
app.use('/api/v1/products', productsController);
app.use('/api/v1/auth', authController);

// Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the .NET-like API',
    documentation: '/api/docs',
    version: '1.0.0',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
    title: 'Internal Server Error',
    status: 500,
    traceId: req.headers['x-request-id'] || '',
    errors: {
      message: err.message || 'An unexpected error occurred',
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api/docs`);
});
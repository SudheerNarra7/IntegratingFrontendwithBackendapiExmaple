import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../services/productService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/v1/products
 * Returns all products
 */
router.get('/', (req, res) => {
  try {
    const products = getProducts();
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
      title: 'Server Error',
      status: 500,
      detail: error.message,
      instance: req.originalUrl
    });
  }
});

/**
 * GET /api/v1/products/:id
 * Returns a single product by ID
 */
router.get('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = getProductById(productId);
    
    if (!product) {
      return res.status(404).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
        title: 'Resource Not Found',
        status: 404,
        detail: `Product with ID ${productId} not found`,
        instance: req.originalUrl
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
      title: 'Server Error',
      status: 500,
      detail: error.message,
      instance: req.originalUrl
    });
  }
});

/**
 * POST /api/v1/products
 * Creates a new product
 */
router.post('/', authenticateToken, (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Validation Error',
        status: 400,
        detail: 'Name, price, and category are required',
        instance: req.originalUrl,
        errors: {
          name: !name ? 'Name is required' : undefined,
          price: !price ? 'Price is required' : undefined,
          category: !category ? 'Category is required' : undefined
        }
      });
    }
    
    const newProduct = createProduct({ name, price, description, category });
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
      title: 'Server Error',
      status: 500,
      detail: error.message,
      instance: req.originalUrl
    });
  }
});

/**
 * PUT /api/v1/products/:id
 * Updates a product by ID
 */
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, price, description, category } = req.body;
    
    if (!name && !price && !description && !category) {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Validation Error',
        status: 400,
        detail: 'At least one field must be provided',
        instance: req.originalUrl
      });
    }
    
    const updatedProduct = updateProduct(productId, { name, price, description, category });
    
    if (!updatedProduct) {
      return res.status(404).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
        title: 'Resource Not Found',
        status: 404,
        detail: `Product with ID ${productId} not found`,
        instance: req.originalUrl
      });
    }
    
    res.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
      title: 'Server Error',
      status: 500,
      detail: error.message,
      instance: req.originalUrl
    });
  }
});

/**
 * DELETE /api/v1/products/:id
 * Deletes a product by ID
 */
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const deleted = deleteProduct(productId);
    
    if (!deleted) {
      return res.status(404).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
        title: 'Resource Not Found',
        status: 404,
        detail: `Product with ID ${productId} not found`,
        instance: req.originalUrl
      });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
      title: 'Server Error',
      status: 500,
      detail: error.message,
      instance: req.originalUrl
    });
  }
});

export default router;
import express from 'express';
import { login, register } from '../services/authService.js';

const router = express.Router();

/**
 * POST /api/v1/auth/login
 * Authenticates a user and returns a JWT token
 */
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Validation Error',
        status: 400,
        detail: 'Email and password are required',
        instance: req.originalUrl,
        errors: {
          email: !email ? 'Email is required' : undefined,
          password: !password ? 'Password is required' : undefined
        }
      });
    }
    
    const result = login(email, password);
    
    if (!result.success) {
      return res.status(401).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.3',
        title: 'Authentication Failed',
        status: 401,
        detail: result.message,
        instance: req.originalUrl
      });
    }
    
    res.json({
      success: true,
      message: 'Authentication successful',
      token: result.token,
      user: result.user
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
 * POST /api/v1/auth/register
 * Registers a new user
 */
router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Validation Error',
        status: 400,
        detail: 'Name, email, and password are required',
        instance: req.originalUrl,
        errors: {
          name: !name ? 'Name is required' : undefined,
          email: !email ? 'Email is required' : undefined,
          password: !password ? 'Password is required' : undefined
        }
      });
    }
    
    const result = register(name, email, password);
    
    if (!result.success) {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Registration Failed',
        status: 400,
        detail: result.message,
        instance: req.originalUrl
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: result.user
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

export default router;
import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../services/userService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/v1/users
 * Returns all users
 */
router.get('/', authenticateToken, (req, res) => {
  try {
    const users = getUsers();
    res.json({
      success: true,
      data: users,
      count: users.length
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
 * GET /api/v1/users/:id
 * Returns a single user by ID
 */
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = getUserById(userId);
    
    if (!user) {
      return res.status(404).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
        title: 'Resource Not Found',
        status: 404,
        detail: `User with ID ${userId} not found`,
        instance: req.originalUrl
      });
    }
    
    res.json({
      success: true,
      data: user
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
 * POST /api/v1/users
 * Creates a new user
 */
router.post('/', authenticateToken, (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    if (!name || !email || !role) {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Validation Error',
        status: 400,
        detail: 'Name, email, and role are required',
        instance: req.originalUrl,
        errors: {
          name: !name ? 'Name is required' : undefined,
          email: !email ? 'Email is required' : undefined,
          role: !role ? 'Role is required' : undefined
        }
      });
    }
    
    const newUser = createUser({ name, email, role });
    res.status(201).json({
      success: true,
      data: newUser
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
 * PUT /api/v1/users/:id
 * Updates a user by ID
 */
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, role } = req.body;
    
    if (!name && !email && !role) {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Validation Error',
        status: 400,
        detail: 'At least one field (name, email, or role) is required',
        instance: req.originalUrl
      });
    }
    
    const updatedUser = updateUser(userId, { name, email, role });
    
    if (!updatedUser) {
      return res.status(404).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
        title: 'Resource Not Found',
        status: 404,
        detail: `User with ID ${userId} not found`,
        instance: req.originalUrl
      });
    }
    
    res.json({
      success: true,
      data: updatedUser
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
 * DELETE /api/v1/users/:id
 * Deletes a user by ID
 */
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const deleted = deleteUser(userId);
    
    if (!deleted) {
      return res.status(404).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
        title: 'Resource Not Found',
        status: 404,
        detail: `User with ID ${userId} not found`,
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
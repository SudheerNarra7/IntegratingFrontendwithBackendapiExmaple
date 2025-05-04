/**
 * Middleware to authenticate JWT token
 * In a real app, this would validate a JWT token
 * This is just a mock implementation for demonstration
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      type: 'https://tools.ietf.org/html/rfc7235#section-3.1',
      title: 'Unauthorized',
      status: 401,
      detail: 'Authentication token is missing',
      instance: req.originalUrl
    });
  }
  
  // For demo purposes, we'll just accept any token
  // In a real app, you would verify the JWT token here
  req.user = { id: 1, name: 'Demo User', role: 'admin' };
  next();
};
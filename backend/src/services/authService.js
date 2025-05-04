// Mock user database
const users = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' }
];

/**
 * Login a user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Login result
 */
export const login = (email, password) => {
  const user = users.find(u => u.email === email);
  
  if (!user || user.password !== password) {
    return {
      success: false,
      message: 'Invalid email or password'
    };
  }
  
  // In a real app, you would generate a JWT token here
  const token = 'mock-jwt-token';
  
  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

/**
 * Register a new user
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Registration result
 */
export const register = (name, email, password) => {
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    return {
      success: false,
      message: 'Email already in use'
    };
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role: 'user'
  };
  
  users.push(newUser);
  
  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  };
};
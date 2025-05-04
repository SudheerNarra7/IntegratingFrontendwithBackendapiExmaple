// Mock user database
let users = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
];

/**
 * Get all users
 * @returns {Array} List of all users
 */
export const getUsers = () => {
  return users;
};

/**
 * Get a user by ID
 * @param {number} id - User ID
 * @returns {Object|null} User or null if not found
 */
export const getUserById = (id) => {
  return users.find(u => u.id === id) || null;
};

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Object} Newly created user
 */
export const createUser = (userData) => {
  const newUser = {
    id: users.length + 1,
    ...userData
  };
  
  users.push(newUser);
  return newUser;
};

/**
 * Update a user by ID
 * @param {number} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Object|null} Updated user or null if not found
 */
export const updateUser = (id, userData) => {
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedUser = {
    ...users[index],
    ...userData
  };
  
  users[index] = updatedUser;
  return updatedUser;
};

/**
 * Delete a user by ID
 * @param {number} id - User ID
 * @returns {boolean} Whether user was deleted
 */
export const deleteUser = (id) => {
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    return false;
  }
  
  users.splice(index, 1);
  return true;
};
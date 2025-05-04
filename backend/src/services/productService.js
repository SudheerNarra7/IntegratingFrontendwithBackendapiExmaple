// Mock product database
let products = [
  { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop for professionals', category: 'Electronics' },
  { id: 2, name: 'Smartphone', price: 699.99, description: 'Latest smartphone with advanced features', category: 'Electronics' },
  { id: 3, name: 'Headphones', price: 199.99, description: 'Noise-cancelling wireless headphones', category: 'Audio' },
  { id: 4, name: 'Coffee Maker', price: 89.99, description: 'Programmable coffee maker with timer', category: 'Appliances' },
  { id: 5, name: 'Running Shoes', price: 129.99, description: 'Lightweight running shoes for athletes', category: 'Sportswear' }
];

/**
 * Get all products
 * @returns {Array} List of all products
 */
export const getProducts = () => {
  return products;
};

/**
 * Get a product by ID
 * @param {number} id - Product ID
 * @returns {Object|null} Product or null if not found
 */
export const getProductById = (id) => {
  return products.find(p => p.id === id) || null;
};

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @returns {Object} Newly created product
 */
export const createProduct = (productData) => {
  const newProduct = {
    id: products.length + 1,
    ...productData,
    price: parseFloat(productData.price)
  };
  
  products.push(newProduct);
  return newProduct;
};

/**
 * Update a product by ID
 * @param {number} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Object|null} Updated product or null if not found
 */
export const updateProduct = (id, productData) => {
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedProduct = {
    ...products[index],
    ...productData
  };
  
  if (productData.price) {
    updatedProduct.price = parseFloat(productData.price);
  }
  
  products[index] = updatedProduct;
  return updatedProduct;
};

/**
 * Delete a product by ID
 * @param {number} id - Product ID
 * @returns {boolean} Whether product was deleted
 */
export const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return false;
  }
  
  products.splice(index, 1);
  return true;
};
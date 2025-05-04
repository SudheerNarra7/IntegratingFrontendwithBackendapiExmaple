import React, { useState, useEffect } from 'react';
import { GanttChart, Users, Package2 } from 'lucide-react';

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home');

  useEffect(() => {
    // Check if API is running
    fetch('http://localhost:5000')
      .then(response => {
        if (!response.ok) {
          throw new Error('API is not responding');
        }
        setApiStatus('Running');
      })
      .catch(error => {
        console.error('API connection error:', error);
        setApiStatus('Not connected');
      });

    // Fetch products
    fetch('http://localhost:5000/api/v1/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.data || []);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const renderHome = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Welcome to the API Client</h2>
      <div className="mb-4 p-4 bg-gray-50 rounded border border-gray-200">
        <h3 className="font-semibold text-lg mb-2">API Status</h3>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${apiStatus === 'Running' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>{apiStatus}</span>
        </div>
      </div>
      <p className="text-gray-700 mb-4">
        This application demonstrates connecting to a Node.js API built to simulate a .NET Web API structure.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Users API
          </h3>
          <p className="text-sm text-gray-600">Access and manage user records</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <Package2 className="h-5 w-5 mr-2 text-purple-600" />
            Products API
          </h3>
          <p className="text-sm text-gray-600">Manage product inventory</p>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{product.id}</td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GanttChart className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">API Explorer</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button 
                  onClick={() => setActiveTab('home')} 
                  className={`px-3 py-2 rounded ${activeTab === 'home' ? 'bg-white text-blue-700' : 'text-white hover:bg-blue-700'} transition-colors`}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('products')} 
                  className={`px-3 py-2 rounded ${activeTab === 'products' ? 'bg-white text-blue-700' : 'text-white hover:bg-blue-700'} transition-colors`}
                >
                  Products
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4 mt-8">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'products' && renderProducts()}
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>API Explorer | {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
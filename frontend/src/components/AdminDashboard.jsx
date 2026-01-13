import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService, merchandiseService } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [merchandise, setMerchandise] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'iphone',
    image: ''
  });
  const [newMerch, setNewMerch] = useState({
    name: '',
    description: '',
    price: '',
    category: 'hoodie',
    image: ''
  });
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch products, merchandise, and orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, merchandiseRes, ordersRes] = await Promise.all([
          productService.getAll(),
          merchandiseService.getAll(),
          orderService.getAll()
        ]);

        setProducts(productsRes.data);
        setMerchandise(merchandiseRes.data);
        setOrders(ordersRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price)
      };

      const response = await productService.create(productData);
      setProducts([...products, response.data]);

      // Reset form
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: 'iphone',
        image: ''
      });
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  const handleAddMerch = async (e) => {
    e.preventDefault();

    try {
      const merchData = {
        ...newMerch,
        price: parseFloat(newMerch.price)
      };

      const response = await merchandiseService.create(merchData);
      setMerchandise([...merchandise, response.data]);

      // Reset form
      setNewMerch({
        name: '',
        description: '',
        price: '',
        category: 'hoodie',
        image: ''
      });
    } catch (err) {
      console.error('Error adding merchandise:', err);
      alert('Failed to add merchandise');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productService.delete(id);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  const handleDeleteMerch = async (id) => {
    if (!window.confirm('Are you sure you want to delete this merchandise?')) {
      return;
    }

    try {
      await merchandiseService.delete(id);
      setMerchandise(merchandise.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error deleting merchandise:', err);
      alert('Failed to delete merchandise');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await orderService.update(orderId, { status: newStatus });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      await orderService.delete(id);
      setOrders(orders.filter(order => order._id !== id));
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-6">
            <div className="bg-white rounded-lg shadow p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                    }`}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'products' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                    }`}
                  >
                    Manage Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('merchandise')}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'merchandise' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                    }`}
                  >
                    Manage Merchandise
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'orders' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                    }`}
                  >
                    Orders
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-3xl font-bold">{products.length}</p>
                  </div>
                  <div className="bg-green-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold">Total Merchandise</h3>
                    <p className="text-3xl font-bold">{merchandise.length}</p>
                  </div>
                  <div className="bg-purple-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-3xl font-bold">{orders.length}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center border-b pb-2">
                      <span>New product added: iPhone 15 Pro Max</span>
                      <span className="text-gray-500">2 hours ago</span>
                    </li>
                    <li className="flex justify-between items-center border-b pb-2">
                      <span>Order #1234 placed</span>
                      <span className="text-gray-500">5 hours ago</span>
                    </li>
                    <li className="flex justify-between items-center border-b pb-2">
                      <span>Merchandise updated: iPhone Daddy Hoodie</span>
                      <span className="text-gray-500">1 day ago</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="iphone">iPhone</option>
                        <option value="ipad">iPad</option>
                        <option value="mac">Mac</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      >
                        Add Product
                      </button>
                    </div>
                  </form>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Current Products</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-600 hover:text-red-900 mr-4"
                              >
                                Delete
                              </button>
                              <button className="text-blue-600 hover:text-blue-900">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'merchandise' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Manage Merchandise</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Add New Merchandise</h3>
                  <form onSubmit={handleAddMerch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={newMerch.name}
                        onChange={(e) => setNewMerch({...newMerch, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                      <input
                        type="number"
                        value={newMerch.price}
                        onChange={(e) => setNewMerch({...newMerch, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={newMerch.category}
                        onChange={(e) => setNewMerch({...newMerch, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="hoodie">Hoodie</option>
                        <option value="tshirt">T-Shirt</option>
                        <option value="socks">Socks</option>
                        <option value="cap">Cap</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={newMerch.image}
                        onChange={(e) => setNewMerch({...newMerch, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newMerch.description}
                        onChange={(e) => setNewMerch({...newMerch, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      >
                        Add Merchandise
                      </button>
                    </div>
                  </form>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Current Merchandise</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {merchandise.map((item) => (
                          <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteMerch(item._id)}
                                className="text-red-600 hover:text-red-900 mr-4"
                              >
                                Delete
                              </button>
                              <button className="text-blue-600 hover:text-blue-900">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map(order => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap">{order._id.substring(0, 8).toUpperCase()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{order.user?.name || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
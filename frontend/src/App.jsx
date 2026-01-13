import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Merchandise from './components/Merchandise';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Contact from './components/Contact';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import MyOrders from './components/MyOrders';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Products />
            <Merchandise />
            <Contact />
          </>
        } />
        <Route path="/products" element={<Products />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
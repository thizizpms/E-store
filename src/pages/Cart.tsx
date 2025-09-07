import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Shopping
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </motion.div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full md:w-24 h-48 md:h-24 object-cover rounded-lg"
                />

                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.product.category}
                  </p>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(item.product.price)}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                      {item.quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>

                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Order Summary
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Proceed to Checkout
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearCart}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Clear Cart
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
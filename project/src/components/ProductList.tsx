import React from 'react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 20,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 15,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Wireless Speaker',
    description: 'Portable bluetooth speaker with premium sound',
    price: 149.99,
    image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 20,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Professional Camera',
    description: 'High-resolution digital camera for photography enthusiasts',
    price: 899.99,
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Gaming Laptop',
    description: 'Powerful laptop designed for immersive gaming experience',
    price: 1499.99,
    image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'Compact and comfortable earbuds with great sound quality',
    price: 129.99,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 20,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Smart Home Hub',
    description: 'Central control unit for your smart home devices',
    price: 179.99,
    image: 'https://images.pexels.com/photos/4790255/pexels-photo-4790255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Fitness Tracker',
    description: 'Advanced activity tracker with heart rate monitoring',
    price: 89.99,
    image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    stock: 18,
    created_at: new Date().toISOString(),
  }
];

export const ProductList: React.FC = () => {
  const { dispatch } = useCart();

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {SAMPLE_PRODUCTS.map((product) => (
        <div
          key={product.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
        >
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {product.description}
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>In stock: {product.stock}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <button
                onClick={() => addToCart(product)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
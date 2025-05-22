import React, { useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShippingForm } from './ShippingForm';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();
  const [showShippingForm, setShowShippingForm] = useState(false);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity > 20) {
      alert('Maximum quantity per item is 20');
      return;
    }
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const handleShippingSubmit = () => {
    alert('Order placed successfully!');
    dispatch({ type: 'CLEAR_CART' });
    setShowShippingForm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {showShippingForm ? 'Shipping Details' : 'Shopping Cart'}
                </h2>
                <button
                  onClick={onClose}
                  className="ml-3 h-7 flex items-center justify-center"
                >
                  <X className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                </button>
              </div>

              {!showShippingForm ? (
                <>
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                        {state.items.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">${item.price}</p>
                                </div>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="text-gray-500 dark:text-gray-400">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                  className="font-medium text-red-600 hover:text-red-500"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                      <p>Subtotal</p>
                      <p>${state.total.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => setShowShippingForm(true)}
                        disabled={state.items.length === 0}
                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500 dark:text-gray-400">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="font-medium text-blue-600 hover:text-blue-500"
                          onClick={onClose}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> →</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-8">
                  <ShippingForm onSubmit={handleShippingSubmit} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
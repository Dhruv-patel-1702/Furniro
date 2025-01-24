import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('bank');

  return (
    <div className="mt-[75px] min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full h-[316px] bg-[url('/assets/checkout.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="flex flex-col items-center gap-4">
           
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-28 py-16">
        <div className="flex flex-col sm:flex-row gap-10">
          {/* Billing Details Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Billing details</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <label className="block text-sm mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Company Name (Optional)</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Country / Region</label>
                <select className="w-full p-2 border border-gray-200 rounded appearance-none bg-white">
                  <option>Sri Lanka</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Street address</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Town / City</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Province</label>
                <select className="w-full p-2 border border-gray-200 rounded appearance-none bg-white">
                  <option>Western Province</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">ZIP code</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Email address</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Additional information</label>
                <textarea
                  rows="3"
                  placeholder="Additional information"
                  className="w-full p-2 border border-gray-200 rounded"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full sm:w-[400px] mt-14">
            <div className="space-y-4">
              <div className="flex justify-between items-center font-bold text-xl">
                <span className="text-base">Product</span>
                <span className="text-base">Subtotal</span>
              </div>

              <div className="flex justify-between items-center text-base text-gray-600 ">
                <span>Asgaard sofa × 1</span>
                <span>Rs. 250,000.00</span>
              </div>
              
              <div className="flex justify-between items-center text-base pt-4 border-t">
                <span>Subtotal</span>
                <span>Rs. 250,000.00</span>
              </div>
              
              <div className="flex justify-between items-center ">
                <span className="text-base">Total</span>
                <span className="text-[#B88E2F] text-base font-medium">Rs. 250,000.00</span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-2">
                  <input 
                    type="radio" 
                    name="payment" 
                    id="bank" 
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="bank" className="text-sm">Direct Bank Transfer</label>
                    {paymentMethod === 'bank' && (
                      <p className="text-sm text-gray-500 mt-2">
                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="payment" 
                    id="cash" 
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                  />
                  <label htmlFor="cash" className="text-sm">Cash On Delivery</label>
                </div>
              </div>

              <div className="text-sm text-gray-500 pt-4 ml-6">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
                <a href="/privacy-policy" className="text-black underline">privacy policy</a>.
              </div>

              <div className='flex justify-center'>
                <button className="w-full sm:w-[200px] bg-white text-black border border-gray-300 py-2.5 rounded text-sm hover:bg-black hover:text-white transition-colors mt-4">
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Checkout;

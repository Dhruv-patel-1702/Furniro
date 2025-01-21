import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('bank');

  return (
    <div className="mt-[75px] min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full h-[316px] bg-[url('./assets/checkout.png')] bg-cover bg-center relative">
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
                <span className="text-sm">Product</span>
                <span className="text-sm">Subtotal</span>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Asgaard sofa × 1</span>
                <span>Rs. 250,000.00</span>
              </div>
              
              <div className="flex justify-between items-center text-sm pt-4 border-t">
                <span>Subtotal</span>
                <span>Rs. 250,000.00</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Total</span>
                <span className="text-[#B88E2F] font-medium">Rs. 250,000.00</span>
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
                      <p className="text-xs text-gray-500 mt-2">
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

              <div className="text-xs text-gray-500 pt-4">
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
      <div className=" flex  items-center w-full bg-[#FAF3EA] py-12 h-auto">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-28 ">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            {/* High Quality */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">High Quality</h3>
                <p className="text-[#898989] text-sm">
                  crafted from top materials
                </p>
              </div>
            </div>

            {/* Warranty Protection */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Warranty Protection</h3>
                <p className="text-[#898989] text-sm">Over 2 years</p>
              </div>
            </div>

            {/* Free Shipping */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Free Shipping</h3>
                <p className="text-[#898989] text-sm">Order over 150 $</p>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">24 / 7 Support</h3>
                <p className="text-[#898989] text-sm">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

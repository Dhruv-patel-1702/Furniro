import React, { useState } from "react";

const Profile = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[100vh] bg-[url('https://t4.ftcdn.net/jpg/03/17/30/63/240_F_317306393_XTASW9Dx8kpxcm6xNOpOTY4ARdyBVBYt.jpg')] bg-cover bg-center relative">
      <div className="w-full max-w-md mx-auto">
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-4">
            <img
              src="assets/card5.png" 
              alt="pp"
              className="w-24 h-24 rounded-full border-2 border-[#9c7827] mb-4"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4">Profile Details</h1>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Name:</label>
            <input
              type="text"
              placeholder=""
              className="border rounded p-2 mb-2"
            />

            <label className="font-semibold">Email Address:</label>
            <input
              type="email"
              placeholder=""
              className="border rounded p-2 mb-2"
            />

            <label className="font-semibold">Mobile Number:</label>
            <input
              type="text"
              placeholder=""
              className="border rounded p-2 mb-2"
            />

            <label className="font-semibold">Gender:</label>
            <div className="flex mb-2">
              <label className="mr-4">
                <input type="radio" name="gender" value="male" /> Male
              </label>
              <label className="mr-4">
                <input type="radio" name="gender" value="female" /> Female
              </label>
              <label>
                <input type="radio" name="gender" value="other" /> Other
              </label>
            </div>

            <label className="font-semibold">Password:</label>
            <div className="space-x-5">
            <input
              type="password"
              placeholder=""
              className="border rounded p-2 mb-4"
            />

            <button
              onClick={handleButtonClick}
              className="bg-[#4b5563] text-white rounded pt-2 pb-2 pl-4 pr-4"
            >
              Change Password
            </button>
            </div>
          </div>

          <button className="bg-[#b88e2f] text-white rounded p-2 w-full">
            Save Changes
          </button>

          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg p-6">
                <span className="cursor-pointer" onClick={closePopup}>
                  &times;
                </span>
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <input
                  type="password"
                  placeholder="New Password"
                  className="border rounded p-2 mb-4"
                />
                <button
                  onClick={closePopup}
                  className="bg-green-500 text-white rounded p-2"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`fixed right-0 top-0 w-1/3 bg-white shadow-lg transition-transform ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button onClick={toggleCart} className="absolute top-2 right-2">
            ✖
          </button>
          <h2 className="text-xl font-bold p-4">Shopping Cart</h2>
          <div className="p-4">
            <p>Your cart is empty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

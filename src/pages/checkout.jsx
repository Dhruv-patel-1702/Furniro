import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    addressType: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const editAddress = location.state?.editAddress;
    if (editAddress) {
      setIsEditMode(true);
      setAddressId(editAddress._id);
      setUserDetails({
        fullName: editAddress.fullName || "",
        phoneNumber: editAddress.phoneNumber || "",
        addressLine1: editAddress.addressLine1 || "",
        addressLine2: editAddress.addressLine2 || "",
        landmark: editAddress.landmark || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        pincode: editAddress.pincode || "",
        country: editAddress.country || "",
        addressType: editAddress.addressType || "",
      });
    }
  }, [location]);

  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to continue");
          return;
        }

        const response = await axios.get(
          "https://ecommerce-shop-qg3y.onrender.com/api/address/displayAllAdress",
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          const defaultAddress = response.data.data.find(addr => addr.isDefault) || response.data.data[0];
          
          if (defaultAddress) {
            setUserDetails({
              fullName: defaultAddress.fullName || "",
              phoneNumber: defaultAddress.phoneNumber || "",
              addressLine1: defaultAddress.addressLine1 || "",
              addressLine2: defaultAddress.addressLine2 || "",
              landmark: defaultAddress.landmark || "",
              city: defaultAddress.city || "",
              state: defaultAddress.state || "",
              pincode: defaultAddress.pincode || "",
              country: defaultAddress.country || "",
              addressType: defaultAddress.addressType || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching default address:", error);
        setError(error.response?.data?.message || "Failed to fetch address information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefaultAddress();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userDetails.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!userDetails.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(String(userDetails.phoneNumber))) {
      newErrors.phoneNumber = "Enter valid 10-digit phone number";
    }
    if (!userDetails.addressLine1?.trim()) {
      newErrors.addressLine1 = "Address is required";
    }
    if (!userDetails.city?.trim()) {
      newErrors.city = "City is required";
    }
    if (!userDetails.state?.trim()) {
      newErrors.state = "State is required";
    }
    if (!userDetails.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(String(userDetails.pincode))) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }
    if (!userDetails.country?.trim()) {
      newErrors.country = "Country is required";
    }
    if (!userDetails.addressType) {
      newErrors.addressType = "Please select address type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Please login to place order");
        return;
      }
      console.log("Token:", token);
      const response = await axios.post(
        "https://ecommerce-shop-qg3y.onrender.com/api/address/addAddress",
        {
          ...userDetails,
          paymentMethod,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        navigate("/myAddress");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Please login to update address");
        return;
      }
      
      const response = await axios.put(
        `https://ecommerce-shop-qg3y.onrender.com/api/address/updateAddress?addressId=${addressId}`,
        userDetails,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.data) {
        toast.success("Address updated successfully!");
        navigate("/myAddress");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to update address. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="mt-[75px] min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full h-[316px] bg-[url('/assets/checkout.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="flex flex-col items-center gap-4"></div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-28 py-16">
        <h1 className="text-2xl font-medium mb-8">Billing details</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={userDetails.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={userDetails.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Address Line 1</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={userDetails.addressLine1}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={userDetails.addressLine2}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={userDetails.landmark}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={userDetails.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={userDetails.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={userDetails.pincode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Address Type</label>
                  <select
                    name="addressType"
                    value={userDetails.addressType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded"
                  >
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={userDetails.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-8">
            <div className="space-y-4">
              

              {/* Payment Methods */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-2">
                  <input
                    type="radio"
                    name="payment"
                    id="bank"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="bank" className="text-sm">
                      Direct Bank Transfer
                    </label>
                    {paymentMethod === "bank" && (
                      <p className="text-sm text-gray-500 mt-2">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    id="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <label htmlFor="cash" className="text-sm">
                    Cash On Delivery
                  </label>
                </div>
              </div>

              <div className="text-sm text-gray-500 pt-4 ml-6">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <a href="/privacy-policy" className="text-black underline">
                  privacy policy
                </a>
                .
              </div>

              <div className="flex justify-center space-x-4">
                {isEditMode ? (
                  <button
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                    className="w-full sm:w-[200px] bg-white text-black border border-gray-300 py-2.5 rounded text-sm hover:bg-black hover:text-white transition-colors mt-4 disabled:opacity-50"
                  >
                    {isLoading ? "Saving Changes..." : "Save Changes"}
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="w-full sm:w-[200px] bg-white text-black border border-gray-300 py-2.5 rounded text-sm hover:bg-black hover:text-white transition-colors mt-4 disabled:opacity-50"
                  >
                    {isLoading ? "Proceed to Payment..." : "Proceed to Payment"}
                  </button>
                )}
                <Link to="/myAddress">
                  <button className="w-full sm:w-[200px] bg-white text-black border border-gray-300 py-2.5 rounded text-sm hover:bg-black hover:text-white transition-colors mt-4 disabled:opacity-50">
                    View All Address
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

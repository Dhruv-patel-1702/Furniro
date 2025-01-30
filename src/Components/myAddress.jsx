import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        "https://ecommerce-shop-qg3y.onrender.com/api/address/displayAllAdress",
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        setAddresses(response.data.data);
      } else {
        console.error("Invalid response format:", response.data);
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddresses([]);
    }
  };

  const handleEdit = (address) => {
    navigate("/checkout", { state: { editAddress: address } });
  };

  const handleDelete = async (addressId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(
        `https://ecommerce-shop-qg3y.onrender.com/api/address/deleteAddress?addressId=${addressId}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        fetchAddresses();
      } else {
        console.error("Failed to delete address:", response.data);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mt-32 mb-32">
        <h1 className="text-2xl font-bold mb-6 text-center">My Addresses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {Array.isArray(addresses) && addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address._id}
                className={`bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow ${
                  selectedAddress === address._id ? "bg-[#B88E2F]/15" : ""
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddress === address._id}
                      onChange={() => setSelectedAddress(address._id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {address.fullName}
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        <p>
                          Address :{" "}
                          {`${address.addressLine1}${
                            address.addressLine2
                              ? `, ${address.addressLine2}`
                              : ""
                          }`}
                        </p>
                        <p>
                          {address.landmark && `Landmark: ${address.landmark}`}
                        </p>
                        <p>
                          {address.city}, {address.state}
                        </p>
                        <p>PIN: {address.pincode}</p>
                        <p className="font-medium">📞 {address.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => handleEdit(address)}
                      className="flex-1 px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#a17e2a] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address._id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No addresses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAddress;

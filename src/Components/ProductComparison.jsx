import React from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCompare } from '../context/CompareContext';

const ProductComparison = () => {
  const { compareItems, removeFromCompare } = useCompare();

  const comparisonProducts = [
    {
      id: 1,
      name: "Asgaard Sofa",
      price: "Rs. 250,000.00",
      image: "./assets/Asgaardsofa.png",
      rating: 4.7,
      reviews: "204 Review",
    },
    {
      id: 2,
      name: "Outdoor Sofa Set",
      price: "Rs. 224,000.00",
      image: "./assets/Asgaardsofa.png",
      rating: 4.2,
      reviews: "145 Review",
    }
  ];

  const specifications = {
    general: [
      { label: "Sales Package", value1: "1 sectional sofa", value2: "1 Three Seater, 2 Single Seater" },
      { label: "Model Number", value1: "TFCBLIOBLG5HS", value2: "DTUBLGRBL56B" },
      { label: "Secondary Material", value1: "Solid Wood", value2: "Solid Wood" },
      { label: "Configuration", value1: "L-shaped", value2: "L-shaped" },
      { label: "Upholstery Material", value1: "Fabric + Cotton", value2: "Fabric + Cotton" },
      { label: "Upholstery Color", value1: "Bright Grey & Lion", value2: "Bright Grey & Lion" }
    ],
    product: [
      { label: "Filling Material", value1: "Foam", value2: "Matte" },
      { label: "Finish Type", value1: "Bright Grey & Lion", value2: "Bright Grey & Lion" },
      { label: "Adjustable Headrest", value1: "No", value2: "yes" },
      { label: "Maximum Load Capacity", value1: "280 KG", value2: "300 KG" },
      { label: "Origin of Manufacture", value1: "India", value2: "India" }
    ],
    warranty: [
      { 
        label: "Warranty Summary", 
        value1: "1 Year Manufacturing Warranty", 
        value2: "1.2 Year Manufacturing Warranty" 
      },
      { 
        label: "Warranty Service Type", 
        value1: "For Warranty Claims or Any Product Related Issues ", 
        value2: "For Warranty Claims or Any Product Related Issues " 
      },
      { 
        label: "Covered in Warranty", 
        value1: "Warranty Against Manufacturing Defect", 
        value2: "Warranty of the product is limited to manufacturing defects only." 
      },
      { 
        label: "Not Covered in Warranty", 
        value1: "The Warranty Does Not Cover Damages Due To Wear & sage.", 
        value2: "The Warranty Does Not Cover Damages Due T WearOf Produge." 
      },
      { 
        label: "Domestic Warranty", 
        value1: "1 Year", 
        value2: "3 Months" 
      }
    ]
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <StarIcon key={index} className="text-[#FFC700]" fontSize="small" />
        ))}
        {hasHalfStar && <StarHalfIcon className="text-[#FFC700]" fontSize="small" />}
        {[...Array(5 - Math.ceil(rating))].map((_, index) => (
          <StarIcon key={`empty-${index}`} className="text-gray-300" fontSize="small" />
        ))}
      </div>
    );
  };

  const renderSpecificationTable = () => {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-32 py-16">
        <div className="border-t border-gray-200">
          {/* General Section */}
          <div className="py-4">
            <h2 className="text-2xl font-medium mb-6">General</h2>
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="text-black font-bold pr-8 space-y-4">
                {specifications.general.map((spec, index) => (
                  <div key={index} className="text-gray-600">{spec.label}</div>
                ))}
              </div>
              <div className="px-8 space-y-4">
                {specifications.general.map((spec, index) => (
                  <div key={index} className="text-gray-800">{spec.value1}</div>
                ))}
              </div>
              <div className="px-8 space-y-4">
                {specifications.general.map((spec, index) => (
                  <div key={index} className="text-gray-800">{spec.value2}</div>
                ))}
              </div>
              <div className="pl-8 space-y-4">
                {specifications.general.map((spec, index) => (
                  <div key={index} className="text-center"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Section */}
          <div className="py-8">
            <h2 className="text-2xl font-medium mb-6">Product</h2>
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="text-black font-bold  pr-8 space-y-4">
                {specifications.product.map((spec, index) => (
                  <div key={index} className="text-gray-600">{spec.label}</div>
                ))}
              </div>
              <div className="px-8 space-y-4">
                {specifications.product.map((spec, index) => (
                  <div key={index} className="text-gray-800">{spec.value1}</div>
                ))}
              </div>
              <div className="px-8 space-y-4">
                {specifications.product.map((spec, index) => (
                  <div key={index} className="text-gray-800">{spec.value2}</div>
                ))}
              </div>
              <div className="pl-8 space-y-4">
                {specifications.product.map((spec, index) => (
                  <div key={index} className="text-center"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Warranty Section */}
          <div className="py-8">
            <h2 className="text-2xl font-medium mb-6">Warranty</h2>
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="text-black font-bold  pr-8 space-y-4">
                {specifications.warranty.map((spec, index) => (
                  <div key={index} className="text-gray-600">{spec.label}</div>
                ))}
              </div>
              <div className="px-8 space-y-4">
                {specifications.warranty.map((spec, index) => (
                  <div key={index} className="text-gray-800">{spec.value1}</div>
                ))}
              </div>
              <div className="px-8 space-y-4">
                {specifications.warranty.map((spec, index) => (
                  <div key={index} className="text-gray-800">{spec.value2}</div>
                ))}
              </div>
              <div className="pl-8 space-y-4">
                {specifications.warranty.map((spec, index) => (
                  <div key={index} className="text-center"></div>
                ))}
              </div>
            </div>
            {/* Add To Cart Buttons */}
            <div className="w-[600px] grid grid-cols-2 gap-10 mt-6 mx-auto ">
              <button className="bg-[#B88E2F] text-white px-4 py-3 w-[200px] mr-20 ml-10  hover:bg-[#9e7a29] transition-colors">
                Add To Cart
              </button>
              <button className="bg-[#B88E2F] text-white px-4 py-3 mr-20  hover:bg-[#9e7a29] transition-colors">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-[75px] min-h-screen">
      {/* Header Section */}
      <div className="w-full h-[316px] bg-[url('./assets/comparebg.png')] bg-cover bg-center flex flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white">
        </div>
      </div>

      {/* Product Grid */}
     <div className="w-[1600px] mx-auto">
     <div className="w-[1600px] mx-auto px-4 md:px-28 py-16 flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-16">
          {/* Go to Product Card */}
          <div className="w-full md:w-[250px] mb-4">
            <h3 className="font-medium text-2xl mb-4 w-[200px] mt-10">Go to Product page for more Products</h3>
            <Link 
              to="/shop"
              className="text-[#B88E2F] hover:underline inline-block text-base"
            >
              View More
            </Link>
          </div>

          {/* Product Cards */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {comparisonProducts.map((product) => (
              <div key={product.id} className="w-full md:w-[300px] mb-4">
                <div className="space-y-4">
                  <div className="bg-[#F9F1E7] p-4 flex items-center justify-center h-[200px]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-xl">{product.name}</h3>
                    <p className="text-[#B88E2F] font-medium">{product.price}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                        <span className="ml-2 text-base">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Product Button */}
            <div className="w-full md:w-[250px] mt-10 ">
              <button className=" w-full bg-[#B88E2F] text-white px-6 py-3 rounded flex items-center justify-between hover:bg-[#9e7a29] transition-colors">
                <span>Choose a Product</span>
                <KeyboardArrowDownIcon />
              </button>
              <p className="text-gray-500 mt-4 text-center">Add product to compare</p>
            </div>
          </div>
        </div>
      </div>
     </div>

      {/* Specifications Table */}
      {renderSpecificationTable()}

      {/* Add to Cart Buttons */}
      <div className="w-full bg-[#FAF3EA] py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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

export default ProductComparison;

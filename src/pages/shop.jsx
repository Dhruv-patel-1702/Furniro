import React, { useState, useEffect } from "react";
import { ViewModule, ViewList, KeyboardArrowDown, Menu } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import CompareIcon from "@mui/icons-material/Compare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: "Rp 2.500.000",
      oldPrice: "Rp 3.500.000",
      image: "./assets/Muggo.png",
      discount: "-30%",
    },
    {
      id: 2,
      name: "Leviosa",
      description: "Stylish cafe chair",
      price: "Rp 2.500.000",
      image: "./assets/Pingky.png",
    },
    {
      id: 3,
      name: "Lolito",
      description: "Luxury big sofa",
      price: "Rp 7.000.000",
      oldPrice: "Rp 14.000.000",
      image: "./assets/Lolito.png",
      discount: "-50%",
    },
    {
      id: 4,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: "Rp 500.000",
      image: "./assets/Pingky.png",
      isNew: true,
    },
    {
      id: 5,
      name: "Grifo",
      description: "Night lamp",
      price: "Rp 1.500.000",
      image: "./assets/Grifo.png",
    },
    {
      id: 6,
      name: "Muggo",
      description: "Small mug",
      price: "Rp 150.000",
      image: "./assets/Muggo.png",
      isNew: true,
    },
    {
      id: 7,
      name: "Pingky",
      description: "Cute bed set",
      price: "Rp 7.000.000",
      oldPrice: "Rp 14.000.000",
      image: "./assets/Pingky.png",
      discount: "-50%",
    },
    {
      id: 8,
      name: "Potty",
      description: "Minimalist flower pot",
      price: "Rp 500.000",
      image: "./assets/Potty.png",
      isNew: true,
    },
  ];

  const handleProductClick = (product) => {
    navigate('/singleproduct', { 
      state: { 
        product: {
          ...product,
          images: [product.image, product.image, product.image, product.image]
        } 
      }
    });
  };

  // Add this function to handle dot clicks
  const handleDotClick = (index) => {
    const container = document.getElementById('scrollContainer');
    if (container) {
      const itemWidth = container.querySelector('div').offsetWidth;
      const newPosition = itemWidth * index * 2;
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full h-[200px] md:h-[316px] bg-[url('./assets/shopbg.png')] bg-cover bg-center mt-[75px]">
        <div className="flex items-center gap-2 text-[#9F9F9F]"></div>
      </div>

      {/* Filter and Sort Section */}
      <div className="w-full mx-auto px-4 md:px-8 lg:px-28 py-4 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b bg-[#f9f1e7] space-y-4 md:space-y-0">
        {/* Left Side */}
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <button 
            className="flex items-center gap-2 text-[#9F9F9F]"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Menu className="md:hidden" />
            <span>Filter</span>
            <KeyboardArrowDown />
          </button>

          <div className="hidden md:flex items-center gap-4">
            <ViewModule className="text-[#B88E2F] cursor-pointer" />
            <ViewList className="text-[#9F9F9F] cursor-pointer" />
          </div>

          <div className="hidden md:block h-6 w-[1px] bg-[#9F9F9F]"></div>

          <p className="text-[#9F9F9F] text-sm md:text-base">
            Showing 1-16 of 32 results
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-[#9F9F9F] text-sm md:text-base">Show</span>
            <div className="relative flex-1 md:flex-none">
              <select className="w-full md:w-auto appearance-none bg-transparent border px-4 py-1 pr-8 rounded outline-none cursor-pointer text-sm md:text-base">
                <option>16</option>
                <option>32</option>
                <option>48</option>
              </select>
              <KeyboardArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9F9F9F] pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-[#9F9F9F] text-sm md:text-base">Sort by</span>
            <div className="relative flex-1 md:flex-none">
              <select className="w-full md:w-auto appearance-none bg-transparent border px-4 py-1 pr-8 rounded outline-none cursor-pointer text-sm md:text-base">
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
              <KeyboardArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9F9F9F] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 lg:px-22 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-[#F4F5F7] group relative w-full cursor-pointer mx-auto"
            >
              <div className="relative overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[200px] sm:h-[250px] md:h-[320px] object-cover transition-all duration-300 group-hover:blur-sm"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {product.discount && (
                  <span className="absolute top-3 right-3 bg-[#E97171] text-white px-3 py-1 rounded-sm z-10 text-xs md:text-sm">
                    {product.discount}
                  </span>
                )}

                {product.isNew && (
                  <span className="absolute top-5 right-5 bg-[#2EC1AC] text-white px-4 py-1.5 rounded-sm z-10 text-sm">
                    New
                  </span>
                )}

                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#B88E2F] px-9 py-3 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#B88E2F] hover:text-white z-20 text-base">
                  Add to cart
                </button>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-7 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                    <ShareIcon fontSize="small" />
                    <span className="text-sm">Share</span>
                  </div>
                  <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                    <CompareIcon fontSize="small" />
                    <span className="text-sm">Compare</span>
                  </div>
                  <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                    <FavoriteBorderIcon fontSize="small" />
                    <span className="text-sm">Like</span>
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-5 text-center">
                <h3 className="text-lg md:text-xl font-semibold text-[#3A3A3A]">
                  {product.name}
                </h3>
                <p className="text-[#898989] my-2 text-sm md:text-base">
                  {product.description}
                </p>
                <div className="flex justify-center items-center gap-2">
                  <span className="font-bold text-[#3A3A3A] text-base md:text-lg">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[#B0B0B0] line-through text-sm md:text-base">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Products Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Related Products</h2>
          <div className="relative">
            <div 
              id="scrollContainer"
              className="flex gap-8 overflow-x-auto no-scrollbar pb-6"
            >
              {products.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="min-w-[280px] md:min-w-[310px] bg-[#F4F5F7] group relative cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-all duration-300 group-hover:blur-sm"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {product.discount && (
                      <span className="absolute top-3 right-3 bg-[#E97171] text-white px-3 py-1 rounded-sm z-10 text-xs md:text-sm">
                        {product.discount}
                      </span>
                    )}

                    {product.isNew && (
                      <span className="absolute top-5 right-5 bg-[#2EC1AC] text-white px-4 py-1.5 rounded-sm z-10 text-sm">
                        New
                      </span>
                    )}

                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#B88E2F] px-9 py-3 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#B88E2F] hover:text-white z-20 text-base">
                      Add to cart
                    </button>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-7 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                        <ShareIcon fontSize="small" />
                        <span className="text-sm">Share</span>
                      </div>
                      <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                        <CompareIcon fontSize="small" />
                        <span className="text-sm">Compare</span>
                      </div>
                      <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                        <FavoriteBorderIcon fontSize="small" />
                        <span className="text-sm">Like</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 md:p-5 text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-[#3A3A3A]">
                      {product.name}
                    </h3>
                    <p className="text-[#898989] my-2 text-sm md:text-base">
                      {product.description}
                    </p>
                    <div className="flex justify-center items-center gap-2">
                      <span className="font-bold text-[#3A3A3A] text-base md:text-lg">
                        {product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-[#B0B0B0] line-through text-sm md:text-base">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Dots */}
            <div className="flex justify-center items-center gap-3 mt-6">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-[#B88E2F] scale-110' 
                      : 'bg-gray-300 hover:bg-[#B88E2F]/60'
                  }`}
                  aria-label={`View slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 md:gap-4 mt-8 md:mt-16">
          <button className="w-[35px] h-[35px] md:w-[45px] md:h-[45px] bg-[#B88E2F] text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base">
            1
          </button>
          <button className="w-[45px] h-[45px] bg-[#F9F1E7] text-[#000000] rounded-lg hover:bg-[#B88E2F] hover:text-white transition-all">
            2
          </button>
          <button className="w-[45px] h-[45px] bg-[#F9F1E7] text-[#000000] rounded-lg hover:bg-[#B88E2F] hover:text-white transition-all">
            3
          </button>
          <button className="px-6 h-[45px] bg-[#F9F1E7] text-[#000000] rounded-lg hover:bg-[#B88E2F] hover:text-white transition-all">
            Next
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-[#FAF3EA] py-8 md:py-12 ">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-28 ">
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

export default Shop;

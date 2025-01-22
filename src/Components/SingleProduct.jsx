import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import CompareIcon from "@mui/icons-material/Compare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToCompare } = useCompare();
  const location = useLocation();
  const product = location.state?.product;

  const products = [
    {
      id: 1,
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: "Rp 2.500.000",
      oldPrice: "Rp 3.500.000",
      image: "./assets/Syltherine.png",
      images: [
        "./assets/Grifo.png",
        "./assets/Grifo.png",
        "./assets/Grifo.png",
        "./assets/Grifo.png",
      ],
      discount: "-30%",
    },
    {
      id: 2,
      name: "Leviosa",
      description: "Stylish cafe chair",
      price: "Rp 2.500.000",
      image: "./assets/Pingky.png",
      images: [
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png",
      ],
    },
    {
      id: 3,
      name: "Lolito",
      description: "Luxury big sofa",
      price: "Rp 7.000.000",
      oldPrice: "Rp 14.000.000",
      image: "./assets/Lolito.png",
      discount: "-50%",
      images: [
        "./assets/Lolito.png",
        "./assets/Lolito.png",
        "./assets/Lolito.png",
        "./assets/Lolito.png",
      ],
    },
    {
      id: 4,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: "Rp 500.000",
      image: "./assets/Respira.png",
      isNew: true,
      images: [
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png",
        "./assets/Pingky.png",
      ],
    },
  ];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("brown");
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const images = product?.images || [
    product?.image,
    product?.image,
    product?.image,
    product?.image,
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleCompareClick = () => {
    addToCompare(product);
    navigate("/compare");
  };

  const handleProductClick = (product) => {
    // Implement the logic for handling product click
    console.log("Product clicked:", product);
  };

  return (
    <div className="mt-[75px]">
      <div className="bg-[#F9F1E7] py-6">
        <div className="max-w-[1440px] mx-auto px-4 md:px-28">
          <div className="flex flex-wrap items-center gap-2 text-[#9F9F9F]">
            <Link to="/" className="hover:text-[#B88E2F] transition-colors">
              Home
            </Link>
            <span>{">"}</span>
            <Link to="/shop" className="hover:text-[#B88E2F] transition-colors">
              Shop
            </Link>
            <span>{">"}</span>
            <span className="text-black">{product?.name || "Product"}</span>
          </div>
        </div>
      </div>
      {/* Breadcrumb */}

      {/* Product Details */}
      <div className="max-w-[1440px] mx-auto px-4 mt-10 md:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">
          {/* Left - Image Gallery */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnail Images */}
            <div className="flex flex-row md:flex-col gap-2 md:gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`w-[70px] h-[70px] md:w-[95px] md:h-[95px] cursor-pointer transition-all
                    ${
                      selectedImage === index
                        ? "border-2 border-[#B88E2F] bg-[#F9F1E7]"
                        : "border border-[#D9D9D9] hover:border-[#B88E2F] bg-white"
                    }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <div className="w-full h-[300px] md:h-[550px] bg-[#F9F1E7] p-2 md:p-6">
                <img
                  src={images[selectedImage]}
                  alt={product?.name || "Product view"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-4 md:space-y-8 pt-4">
            <h1 className="text-[24px] md:text-[42px] font-medium text-[#3A3A3A]">
              {product?.name}
            </h1>
            <span className="text-[18px] md:text-[28px] text-[#9F9F9F] font-medium">
              {product?.price}
            </span>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-[#FFC700]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[#9F9F9F]">5 Customer Review</span>
            </div>

            <p className="text-[#9F9F9F] leading-relaxed text-[16px]">
              Setting the bar as one of the loudest speakers in its class, the
              Kilburn is a compact, stout-hearted hero with a well-balanced
              audio which boasts a clear midrange and extended highs for a
              sound.
            </p>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="font-bold text-[16px]">Size</h3>
              <div className="flex flex-wrap gap-4">
                {["L", "XL", "XS"].map((size) => (
                  <button
                    key={size}
                    className={`w-[30px] h-[30px] border ${
                      selectedSize === size
                        ? "border-[#B88E2F] text-[#B88E2F]"
                        : "border-[#9F9F9F] text-[#9F9F9F]"
                    } hover:border-[#B88E2F] hover:text-[#B88E2F] transition-colors`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Color</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "brown", color: "#816DFA" },
                  { name: "gray", color: "#000000" },
                  { name: "blue", color: "#CDBA7B" },
                ].map((color) => (
                  <button
                    key={color.name}
                    className={`w-10 h-10 rounded-full ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-[#B88E2F]"
                        : ""
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="flex items-center border border-[#9F9F9F] rounded-md">
                <button
                  className="px-3 py-2 text-xl"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-[#9F9F9F]">
                  {quantity}
                </span>
                <button
                  className="px-3 py-2 text-xl"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-[#B88E2F] text-white px-6 py-3 hover:bg-[#9e7a29] transition-colors w-full md:w-auto"
              >
                Add To Cart
              </button>
              <button
                onClick={handleCompareClick}
                className="px-6 py-3 bg-[#B88E2F] text-white hover:bg-opacity-90 transition-colors w-full md:w-auto"
              >
                Compare
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-8 space-y-4">
              <div className="flex items-center gap-8 text-[#9F9F9F]">
                <span>SKU</span>
                <span>:</span>
                <span>SS001</span>
              </div>
              <div className="flex items-center gap-8 text-[#9F9F9F]">
                <span>Category</span>
                <span>:</span>
                <span>Sofas</span>
              </div>
              <div className="flex items-center gap-8 text-[#9F9F9F]">
                <span>Tags</span>
                <span>:</span>
                <span>Sofa, Chair, Home, Shop</span>
              </div>
              <div className="flex items-center gap-8 text-[#9F9F9F]">
                <span>Share</span>
                <span>:</span>
                <div className="flex items-center gap-4">
                  <ShareIcon className="cursor-pointer hover:text-[#B88E2F]" />
                  <CompareIcon className="cursor-pointer hover:text-[#B88E2F]" />
                  <FavoriteBorderIcon className="cursor-pointer hover:text-[#B88E2F]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Tabs Section */}
      <div className="mt-24 border-t border-[#D9D9D9]">
        {/* Tab Navigation */}
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-center border-b border-[#D9D9D9]">
            <div className="flex space-x-4 px-4 md:space-x-16">
              <button
                onClick={() => handleTabClick("description")}
                className={` py-6 font-medium ${
                  activeTab === "description"
                    ? "text-[#B88E2F] border-b-2 border-[#B88E2F]"
                    : "text-[#9F9F9F]"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => handleTabClick("additional")}
                className={` py-6 font-medium ${
                  activeTab === "additional"
                    ? "text-[#B88E2F] border-b-2 border-[#B88E2F]"
                    : "text-[#9F9F9F]"
                }`}
              >
                Additional Information
              </button>
              <button
                onClick={() => handleTabClick("reviews")}
                className={` py-6 font-medium ${
                  activeTab === "reviews"
                    ? "text-[#B88E2F] border-b-2 border-[#B88E2F]"
                    : "text-[#9F9F9F]"
                }`}
              >
                Reviews [5]
              </button>
            </div>
          </div>

          {/* Description Content */}
          <div className="py-12">
            <div className="grid grid-row-2 gap-12">
              {/* Left Column - Text */}
              <div className="space-y-6 px-4 md:px-36">
                <p className="text-[#9F9F9F] leading-7">
                  Embodying the raw, wayward spirit of rock 'n' roll, the
                  Kilburn portable active stereo speaker takes the unmistakable
                  look and sound of Marshall, unplugs the chords, and takes the
                  show on the road.
                </p>
                <p className="text-[#9F9F9F] leading-7">
                  Weighing in under 7 pounds, the Kilburn is a lightweight piece
                  of vintage styled engineering. Setting the bar as one of the
                  loudest speakers in its class, the Kilburn is a compact,
                  stout-hearted hero with a well-balanced audio which boasts a
                  clear midrange and extended highs for a sound that is both
                  articulate and pronounced. The analogue knobs allow you to
                  fine tune the controls to your personal preferences while the
                  guitar-influenced leather strap enables easy and stylish
                  travel.
                </p>
              </div>

              {/* Right Column - Images */}
              <div className="grid grid-cols-2 gap-8 px-4 md:px-24">
                <div className="bg-[#F9F1E7] p-4 ">
                  <img
                    src="./assets/bad.png"
                    alt="Product front view"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="bg-[#F9F1E7] p-4">
                  <img
                    src="./assets/bad.png"
                    alt="Product side view"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full mx-auto px-4 py-16 sm:px-2">
          <div className="text-center mb-[32px]">
            <h2 className="text-[30px] sm:text-[40px] font-bold text-[#3A3A3A] mb-3">
              Related Products
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-52">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="bg-[#F4F5F7] group relative w-full cursor-pointer rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-[150px] sm:h-[200px] md:h-[250px] object-cover transition-all duration-300 group-hover:blur-sm"
                  />
                  {product.discount && (
                    <span className="absolute top-5 right-5 bg-[#E97171] text-white px-3 py-1 rounded-sm z-10 text-sm">
                      {product.discount}
                    </span>
                  )}

                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#B88E2F] px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#B88E2F] hover:text-white z-20 text-base">
                    Add to cart
                  </button>

                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                      <ShareIcon fontSize="small" />
                      <span className="text-sm">Share</span>
                    </div>
                    <div
                      onClick={handleCompareClick}
                      className="flex items-center gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors"
                    >
                      <CompareIcon fontSize="small" />
                      <span className="text-sm">Compare</span>
                    </div>
                    <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#B88E2F] transition-colors">
                      <FavoriteBorderIcon fontSize="small" />
                      <span className="text-sm">Like</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 text-center">
                  <h3 className="text-sm sm:text-lg md:text-lg sm:text-2xl font-semibold text-[#3A3A3A]">
                    {product.name}
                  </h3>
                  <p className="text-[#898989] my-1 text-xs sm:text-sm">
                    {product.description}
                  </p>
                  <div className="flex justify-center items-center gap-1">
                    <span className="font-bold text-[#3A3A3A] text-sm sm:text-lg">
                      {product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[#B0B0B0] line-through text-xs sm:text-sm">
                        {product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center mt-12">
            <button
              className="px-16 py-3 border border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition-colors duration-300"
              onClick={() => {
                // Add your show more functionality here
                console.log("Show more clicked");
              }}
            >
              Show More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

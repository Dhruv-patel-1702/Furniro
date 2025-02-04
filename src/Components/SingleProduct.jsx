import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import CompareIcon from "@mui/icons-material/Compare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";
import { TbBackground } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { addToCompare } = useCompare();
  const location = useLocation();
  const product = location.state?.product;

  const [currentProduct, setCurrentProduct] = useState(product);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.size?.[0] || "6");
  const [selectedColor, setSelectedColor] = useState(product?.colour?.[0] || "white");
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setIsLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const images = currentProduct?.images || [currentProduct?.image];

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce-shop-qg3y.onrender.com/api/product/display?id=${product._id}`
        );

        // Check if the response contains the expected data structure
        if (
          response.data.success &&
          Array.isArray(response.data.data.similarProducts)
        ) {
          setRelatedProducts(response.data.data.similarProducts); // Update to use the correct path
        } else {
          console.log("Expected an array but got:", response.data);
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts([]);
      }
    };

    if (product?._id) {
      fetchRelatedProducts();
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setCurrentProduct(product);
      setSelectedSize(product.size[0]);
      setSelectedColor(product.colour[0]);
    }
  }, [product]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddToCart = () => {
    const url = "https://ecommerce-shop-qg3y.onrender.com/api/cart/addToCart";
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("You need to log in to add items to the cart.");
      return;
    }

    if (!product?._id) {
      toast.error("Invalid product. Please try again.");
      console.error("Error: Missing productId", product);
      return;
    }

    // Check if size and color are selected
    if (!selectedSize) {
      toast.warning("Size is not selected. Please select a size.");
      return;
    }

    if (!selectedColor) {
      toast.warning("Color is not selected. Please select a color.");
      return;
    }

    const totalPrice = quantity * parseFloat(product.price);

    const data = {
      productId: product._id,
      quantity: quantity,
      price: parseFloat(product.price),
      totalPrice: totalPrice,
      productSize: selectedSize,
      productColour: selectedColor,
    };

    setIsLoading(true);

    axios
      .post(url, data, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          // Add to cart context to update cart count
          addToCart({
            ...product,
            quantity,
            selectedSize,
            selectedColor,
            totalPrice,
          });
          toast.success(
            `✅ ${product.name} has been added to your cart successfully!`
          );
        } else {
          throw new Error(response.data.message || "Failed to add to cart");
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to add product to cart. Please try again.";
        toast.error(`❌ Error: ${errorMessage}`);
        console.error("Error adding to cart:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCompareClick = () => {
    addToCompare(product);
    navigate("/compare");
  };

  const handleProductClick = async (relatedProduct) => {
    try {
      const response = await axios.get(
        `https://ecommerce-shop-qg3y.onrender.com/api/product/display?id=${relatedProduct._id}`
      );
      if (response.data.success) {
        setCurrentProduct(response.data.data.product);
        // Set default size and color with brown background
        setSelectedSize(response.data.data.product.size[0]); // Set default size
        setSelectedColor(response.data.data.product.colour[0]); // Set default color
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
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
            <span className="text-black">
              {currentProduct?.name || "Product"}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Display the first image at the top */}
            <div className="flex flex-col">
              <img
                src={images[0]} // Display the first image
                alt={currentProduct.name}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Other product details go here */}
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 mt-10 md:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Product Images Section */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex flex-row lg:flex-col gap-2 justify-start">
              {Array.isArray(currentProduct?.product_images) &&
              currentProduct.product_images.length > 0 ? (
                currentProduct.product_images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] cursor-pointer transition-all
                      ${
                        selectedImage === index
                          ? "border-2 border-[#B88E2F] bg-[#F9F1E7]"
                          : "border border-[#D9D9D9] hover:border-[#B88E2F]"
                      }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                ))
              ) : (
                <div>No images available</div>
              )}
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <div className="w-full h-[250px] sm:h-[400px] lg:h-[500px] bg-[#F9F1E7] p-2 lg:p-6">
                <img
                  src={currentProduct?.product_images?.[selectedImage]}
                  alt={currentProduct?.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-4 px-2 mt-6 sm:px-4">
            <h1 className="text-xl mb-1 sm:text-2xl lg:text-3xl font-medium">
              {currentProduct?.name}
            </h1>
            <span className="text-lg sm:text-xl lg:text-xl text-[#9F9F9F]  ">
              Rs : {currentProduct?.price}
            </span>
            <p>{product?.description}</p>
            {/* Size Selection */}
            <div className="space-y-2">
              <h3 className="font-bold text-lg">Size</h3>
              <div className="flex flex-wrap gap-2">
                {currentProduct?.size?.map((size, index) => (
                  <div
                    key={index}
                    className={`py-1 px-3 rounded border border-[#bf9943] cursor-pointer
                      ${selectedSize === size
                        ? "bg-[#bf9943] text-white"
                        : "hover:bg-[#bf9943] hover:text-white"
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Color and Quantity */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              {/* Color Selection */}
              <div className="flex items-center gap-2 mt-2">
                <h3 className="font-bold text-lg">Color:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProduct?.colour?.map((colour, index) => (
                    <div
                      key={index}
                      className={`py-1 px-3 rounded border border-[#bf9943] cursor-pointer
                        ${selectedColor === colour
                          ? "bg-[#bf9943] text-white"
                          : "hover:bg-[#bf9943] hover:text-white"
                        }`}
                      onClick={() => setSelectedColor(colour)}
                    >
                      {colour}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 mt-2">
                <h3 className="font-bold text-lg">Quantity:</h3>
                <div className="border border-[#9F9F9F] rounded-md inline-flex">
                  <button
                    className="px-3 py-1"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-[#9F9F9F]">
                    {quantity}
                  </span>
                  <button
                    className="px-3 py-1"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full mt-2 sm:w-auto bg-[#B88E2F] text-white px-6 py-2 rounded hover:bg-[#9e7a29] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Adding..." : "Add To Cart"}
              </button>
              <button
                onClick={handleCompareClick}
                className="w-full mt-2 sm:w-auto bg-[#B88E2F] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Compare
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center gap-8 text-[#9F9F9F]">
                <span>stock</span>
                <span>:</span>
                <span>{product?.stock}</span>
              </div>
              <div className="flex items-center gap-8 text-[#9F9F9F]">
                <span>categoryName</span>
                <span>:</span>
                <span>{product?.categoryName}</span>
              </div>
              <div className="flex items-center gap-8 text-[#9F9F9F]">
                <span>Product details</span>
                <span>:</span>
                <span>{product?.product_details}</span>
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

          {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-52">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  onClick={() => handleProductClick(relatedProduct)}
                  className="bg-[#F4F5F7] group relative w-full cursor-pointer rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={relatedProduct.product_images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-[150px] sm:h-[200px] md:h-[250px] object-cover transition-all duration-300 group-hover:blur-sm"
                    />
                    <div className="p-2 text-center">
                      <h3 className="text-sm sm:text-lg md:text-lg sm:text-2xl font-semibold text-[#3A3A3A]">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-[#898989] my-1 text-xs sm:text-sm">
                        {relatedProduct.description}
                      </p>
                      <div className="flex justify-center items-center gap-1">
                        <span className="font-bold text-[#3A3A3A] text-sm sm:text-lg">
                          Rs: {relatedProduct.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-[#9F9F9F]">
              No related products available.
            </div>
          )}

          {/* Show More Button */}
          <div className="flex justify-center mt-12">
            <button
              className="px-16 py-3 border border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition-colors duration-300"
              onClick={() => {
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
// Material UI Icons
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelIcon from '@mui/icons-material/Label';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CategoryIcon from '@mui/icons-material/Category';
import BrushIcon from '@mui/icons-material/Brush';
import HandymanIcon from '@mui/icons-material/Handyman';
import ChairIcon from '@mui/icons-material/Chair';
import ForestIcon from '@mui/icons-material/Forest';

const Blog = () => {
  const categories = [
    { name: "Crafts", count: 2, icon: <CategoryIcon sx={{ fontSize: 20 }}/> },
    { name: "Design", count: 8, icon: <BrushIcon sx={{ fontSize: 20 }}/> },
    { name: "Handmade", count: 7, icon: <HandymanIcon sx={{ fontSize: 20 }}/> },
    { name: "Interior", count: 1, icon: <ChairIcon sx={{ fontSize: 20 }}/> },
    { name: "Wood", count: 6, icon: <ForestIcon sx={{ fontSize: 20 }}/> }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      image: "./assets/Laptop.png",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Handmade",
      image: "./assets/decorating.png",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
      id: 3,
      title: "Handmade pieces that took time to make",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      image: "./assets/handmade.png",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }
  ];

  const recentPosts = [
    {
      title: "Going all-in with millennial design",
      date: "03 Aug 2022",
      image: "./assets/1.png",
    },
    {
      title: "Exploring new ways of decorating",
      date: "03 Aug 2022",
      image: "./assets/2.png",
    },
    {
      title: "Handmade pieces that took time to make",
      date: "03 Aug 2022",
      image: "./assets/3.png",
    },
    {
      title: "Modern home in Milan",
      date: "03 Aug 2022",
      image: "./assets/4.png",
    },
    {
      title: "Colorful office redesign",
      date: "03 Aug 2022",
      image: "./assets/5.png",
    },
  ];

  // Add state for sidebar visibility
  const [showSidebar, setShowSidebar] = useState(true);

  // Add click handler for Cart/Checkout/Comparison buttons
  const handleButtonClick = () => {
    setShowSidebar(false);
  };

  return (
    <div className="mt-[75px] min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full h-[316px] bg-[url('./assets/Blogbg.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="flex flex-col items-center gap-4">
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-28 py-16">
        <div className="flex gap-20 relative">
          {/* Scrollable Blog Posts */}
          <div className="flex-1 space-y-16">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[400px] object-cover mb-6 rounded-lg"
                />
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <PersonIcon sx={{ fontSize: 18 }} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon sx={{ fontSize: 18 }} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LabelIcon sx={{ fontSize: 18 }} />
                    <span>{post.category}</span>
                  </div>
                </div>
                <h2 className="text-3xl font-medium mb-4">{post.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{post.content}</p>
                <button className="text-black font-medium hover:text-[#B88E2F] transition-colors">
                  Read more
                </button>
              </div>
            ))}
          </div>

          {/* Sticky Sidebar */}
          {showSidebar && (
            <div className="w-[300px] space-y-8 sticky top-[100px] h-fit blog-sidebar">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:border-[#B88E2F]"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B88E2F]">
                  <SearchIcon sx={{ fontSize: 20 }} />
                </button>
              </div>

              {/* Categories */}
              <div className="bg-[#F9F1E7] p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-6">Categories</h3>
                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-gray-600 hover:text-[#B88E2F] cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 group-hover:text-[#B88E2F] transition-colors">
                          {category.icon}
                        </span>
                        <span>{category.name}</span>
                      </div>
                      <span className="bg-white px-2 py-1 rounded-full text-sm">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-[#F9F1E7] p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-6">Recent Posts</h3>
                <div className="space-y-10">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="flex gap-4 cursor-pointer group">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-[#B88E2F] transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <AccessTimeIcon sx={{ fontSize: 14 }} />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center gap-5 pt-8">
              <button className="w-10 h-10 flex items-center justify-center bg-[#B88E2F] text-white rounded">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-[#D8D8D8] hover:bg-[#B88E2F] hover:text-white hover:border-[#B88E2F] transition-colors rounded">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-[#D8D8D8] hover:bg-[#B88E2F] hover:text-white hover:border-[#B88E2F] transition-colors rounded">
                3
              </button>
              <button className="w-16 h-10 flex items-center justify-center border border-[#D8D8D8] hover:bg-[#B88E2F] hover:text-white hover:border-[#B88E2F] transition-colors rounded">
                Next
              </button>
            </div>
      </div>
      <div className=" flex  items-center w-full bg-[#FAF3EA] py-12 h-44">
        <div className="max-w-[1440px] mx-auto px-28 ">
          <div className="grid grid-cols-4 gap-40">
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
              <div></div>
                <h3 className="font-bold text-lg">24 / 7 Support</h3>
                <p className="text-[#898989] text-sm">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Blog;

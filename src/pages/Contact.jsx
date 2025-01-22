import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const Contact = () => {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      {/* Contact Header */}
      <div className="w-full h-[200px] sm:h-[316px] bg-[url('/assets/contactbg.png')] bg-cover bg-center flex flex-col justify-center items-center relative mt-[75px]">
        
      </div>

      {/* Get In Touch Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get In Touch With Us</h2>
          <p className="text-[#9F9F9F] max-w-md mx-auto text-sm sm:text-base">
            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <LocationOnIcon className="text-[#B88E2F] w-6 h-6 sm:w-8 sm:h-8" />
              <div>
                <h3 className="font-bold text-lg">Address</h3>
                <p className="text-[#9F9F9F] text-sm">236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <PhoneIcon className="text-[#B88E2F] w-6 h-6 sm:w-8 sm:h-8" /> 
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-[#9F9F9F] text-sm">Mobile: +(84) 546-6789</p>
                <p className="text-[#9F9F9F] text-sm">Hotline: +(84) 456-6789</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AccessTimeIcon className="text-[#B88E2F] w-6 h-6 sm:w-8 sm:h-8" />
              <div>
                <h3 className="font-bold text-lg">Working Time</h3>
                <p className="text-[#9F9F9F] text-sm">Monday-Friday: 9:00 - 22:00</p>
                <p className="text-[#9F9F9F] text-sm">Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Your name</label>
                <input 
                  type="text" 
                  placeholder="Abc" 
                  className="w-full px-4 py-2 border border-[#9F9F9F] rounded focus:outline-none focus:border-[#B88E2F]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email address</label>
                <input 
                  type="email" 
                  placeholder="Abc@def.com" 
                  className="w-full px-4 py-2 border border-[#9F9F9F] rounded focus:outline-none focus:border-[#B88E2F]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="This is an optional" 
                  className="w-full px-4 py-2 border border-[#9F9F9F] rounded focus:outline-none focus:border-[#B88E2F]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  placeholder="Hi! I'd like to ask about" 
                  rows="4" 
                  className="w-full px-4 py-2 border border-[#9F9F9F] rounded focus:outline-none focus:border-[#B88E2F] resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full md:w-[250px] bg-[#B88E2F] text-white py-2 rounded hover:bg-opacity-90 transition-colors font-bold"
              >
                Submit
              </button>
            </form>
            
          </div>
          
        </div>
        
      </div>
      <div className=" flex  items-center w-full bg-[#FAF3EA] py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-28">
            {/* High Quality */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-full"
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-full"
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-full"
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-full"
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
  )
}

export default Contact

"use client"

import axios from "../utils/axios"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const response = await axios.post("/contact", formData)
      toast.success(response.data.message || "Message sent successfully!")

      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Contact form error:", error)
      toast.error(error.response?.data?.message || "Failed to send message. Try again.")
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us - Free Redeem Code Daily</title>
        <meta name="description" content="Get in touch with Free Redeem Code Daily for any inquiries or support." />
        <link rel="canonical" href="https://freeredeemcodedaily.com/contact" />
        <meta property="og:title" content="Contact Us - Free Redeem Code Daily" />
        <meta
          property="og:description"
          content="Get in touch with Free Redeem Code Daily for any inquiries or support."
        />
        <meta property="og:url" content="https://freeredeemcodedaily.com/contact" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex justify-center items-center px-4 pt-[80px] pb-4 mt-[60px] relative overflow-hidden">
        {/* Gaming background effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-ping"></div>
        </div>

        <div className="w-full max-w-5xl bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 relative">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>

          {/* Left Section - Contact Info */}
          <div className="relative bg-gradient-to-br from-purple-600/80 via-indigo-600/80 to-cyan-600/80 backdrop-blur-sm text-white p-8 space-y-6 border-r border-purple-500/30">
            <div className="relative">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Contact Us
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4 group">
                <div className="bg-gradient-to-br from-cyan-500/30 to-purple-500/30 backdrop-blur-sm p-3 rounded-xl border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm16 0H6v1.586L12 10l6-4.414V4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-cyan-300 font-medium">Email</p>
                  <p className="font-semibold text-white">info@maccotech.in</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm p-3 rounded-xl border border-purple-400/30 group-hover:border-purple-400/60 transition-all duration-300">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-purple-300 font-medium">Location</p>
                  <p className="font-semibold text-white">India</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-cyan-200 text-sm font-medium">We usually respond within 24–48 hours</p>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <form onSubmit={handleSubmit} className="relative bg-gray-900/80 backdrop-blur-sm p-8 space-y-6">
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
            </div>

            <div>
              <label className="block text-cyan-300 font-medium mb-2 text-sm">Your Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-cyan-300 font-medium mb-2 text-sm">Your Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-cyan-300 font-medium mb-2 text-sm">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full p-3 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-cyan-500 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group"
            >
              <span className="relative z-10">Send Message</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

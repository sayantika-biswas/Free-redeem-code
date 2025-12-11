"use client"

import { useEffect, useState } from "react"
import axios from "../utils/axios"

function Footer() {
  const [footerPages, setFooterPages] = useState([])

  useEffect(() => {
    const fetchFooterPages = async () => {
      try {
        const res = await axios.get("/footer") // Returns all pages
        setFooterPages(res.data)
      } catch (err) {
        console.error("Error fetching footer pages:", err)
      }
    }
    fetchFooterPages()
  }, [])

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-purple-900/20 to-black text-white border-t border-purple-500/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-b border-purple-500/20 pb-10">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              🎮 EARN REDEEM CODE
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Get free redeem codes and rewards for top games. Join our gamer community for daily updates, special
              offers, and exclusive bonuses.
            </p>
            <div className="mt-4 flex gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {footerPages.map((page) => (
                <li key={page.slug}>
                  <a
                    href={`/footer/${page.slug}`}
                    className="text-gray-300 hover:text-cyan-400 hover:pl-2 transition-all duration-200 block group"
                  >
                    <span className="inline-block group-hover:text-cyan-400 transition-colors">➤</span> {page.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/faq"
                  className="text-gray-300 hover:text-cyan-400 hover:pl-2 transition-all duration-200 block group"
                >
                  <span className="inline-block group-hover:text-cyan-400 transition-colors">➤</span> FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="text-gray-300 hover:text-cyan-400 hover:pl-2 transition-all duration-200 block group"
                >
                  <span className="inline-block group-hover:text-cyan-400 transition-colors">➤</span> Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm flex items-center gap-2">
                <span className="text-cyan-400">📧</span> info@maccotech.in
              </p>
              {/* <div className="flex gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-all hover:scale-110 transform">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <i className="fab fa-discord text-sm" />
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-all hover:scale-110 transform">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <i className="fab fa-telegram text-sm" />
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-all hover:scale-110 transform">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <i className="fab fa-instagram text-sm" />
                  </div>
                </a>
              </div> */}
            </div>
          </div>
        </div>

        <div className="text-center pt-6 pb-10 text-sm">
          <p className="text-gray-300">
            © {new Date().getFullYear()}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold mx-1">
              Macco Tech
            </span>
            All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-2">
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping delay-100"></div>
            <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping delay-200"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

"use client"

import { useEffect, useState } from "react"
import axios from "../utils/axios"
import { Menu, X } from "lucide-react"

export default function Sidebar({ onSelect, isOpen, setIsOpen }) {
  const [bundles, setBundles] = useState([])

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const res = await axios.get("/game-spin/bundles")
        setBundles(res.data)
      } catch (err) {
        console.error("Failed to fetch bundles", err)
      }
    }

    fetchBundles()
  }, [])

  return (
    <>
      <div className="lg:hidden fixed top-48 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-3 rounded-r-xl bg-gradient-to-r from-orange-600 to-emerald-500 text-white shadow-2xl hover:from-orange-700 hover:to-emerald-600 transition-all duration-300 border border-emerald-400/30 backdrop-blur-sm"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`fixed top-32 left-0 min-h-screen w-64 bg-gradient-to-b from-gray-900/95 via-orange-900/20 to-gray-900/95 backdrop-blur-xl border-r border-emerald-400/30 shadow-2xl z-40 p-4 transform transition-all duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-64 lg:block`}
      >
        <div className="relative">
          <h2 className="text-xl font-bold text-center mb-6 mt-[70px] lg:mt-4 bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
            Choose Game
          </h2>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-orange-400"></div>
        </div>

        <div className="space-y-3 mt-6">
          {bundles.map((bundle) => (
            <div
              key={bundle._id}
              onClick={() => {
                onSelect(bundle) 
                setIsOpen(false)
              }}
              className="group cursor-pointer bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-4 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300 hover:scale-105"
            >
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={bundle.image || "/placeholder.svg"}
                  alt={bundle.title}
                  className="w-full h-20 object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-sm font-semibold text-center text-gray-200 group-hover:text-emerald-300 transition-colors duration-300">
                {bundle.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="absolute top-20 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-4 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-1000"></div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}

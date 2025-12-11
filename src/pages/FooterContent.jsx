"use client"

// PageContent.jsx
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../utils/axios"

export default function FooterContent() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const res = await axios.get(`/footer/${slug}`)
        setPage(res.data)
      } catch (err) {
        setPage(null)
      } finally {
        setLoading(false)
      }
    }
    loadPage()
  }, [slug])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse"></div>
        </div>
        <div className="ml-4 text-cyan-300 text-lg font-medium">Loading content...</div>
      </div>
    )

  if (!page)
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-red-400 text-xl font-semibold bg-red-500/10 px-6 py-3 rounded-lg border border-red-500/30">
            Page not found.
          </div>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-xl animate-float"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-24 px-6 sm:px-8 pb-12">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-8 shadow-2xl relative overflow-hidden">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-sm"></div>
          <div className="absolute inset-[1px] bg-slate-800/60 rounded-2xl"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 pb-3 border-b border-cyan-500/30">
              {page.title}
            </h1>

            <div
              className="prose prose-lg max-w-none text-slate-300 leading-relaxed
                prose-headings:text-cyan-300 prose-headings:font-bold
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-strong:text-purple-300 prose-strong:font-semibold
                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                prose-ul:text-slate-300 prose-ol:text-slate-300
                prose-li:text-slate-300 prose-li:marker:text-cyan-400"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

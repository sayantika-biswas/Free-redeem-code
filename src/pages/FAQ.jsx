"use client"

import { useState, useEffect, useRef } from "react"
import { HelpCircle, Shield, Gift, Users, Smartphone, CreditCard, ChevronDown } from "lucide-react"
import axios from "../utils/axios"

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null)
  const [faqData, setFaqData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [supportQuestion, setSupportQuestion] = useState("")
  const [supportEmail, setSupportEmail] = useState("")
  const [supportLoading, setSupportLoading] = useState(false)
  const [supportSuccess, setSupportSuccess] = useState("")
  const [supportError, setSupportError] = useState("")
  const questionRef = useRef(null)

  // Map icon string from backend to lucide-react icon
  const iconMap = {
    help: <HelpCircle className="w-5 h-5 text-purple-400" />,
    shield: <Shield className="w-5 h-5 text-green-400" />,
    gift: <Gift className="w-5 h-5 text-cyan-400" />,
    users: <Users className="w-5 h-5 text-pink-400" />,
    smartphone: <Smartphone className="w-5 h-5 text-orange-400" />,
    creditcard: <CreditCard className="w-5 h-5 text-yellow-400" />,
    creditcardblue: <CreditCard className="w-5 h-5 text-blue-400" />,
    smartphonecyan: <Smartphone className="w-5 h-5 text-cyan-400" />,
    giftgreen: <Gift className="w-5 h-5 text-green-400" />,
    helpcyan: <HelpCircle className="w-5 h-5 text-cyan-400" />,
    helppurple: <HelpCircle className="w-5 h-5 text-purple-400" />,
  }

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        setLoading(true)
        setError("")
        const res = await axios.get("/faq/")
        if (res.status !== 200) throw new Error("Failed to fetch FAQ")
        setFaqData(res.data)
      } catch (err) {
        setError("Could not load FAQ. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchFAQ()
  }, [])

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id)
  }

  const handleSupportSubmit = async (e) => {
    e.preventDefault()
    setSupportLoading(true)
    setSupportError("")
    setSupportSuccess("")
    try {
      await axios.post("/support/submit", {
        question: supportQuestion,
        email: supportEmail
      })
      setSupportSuccess("Your question has been submitted! We'll get back to you soon.")
      setSupportQuestion("")
      setSupportEmail("")
      if (questionRef.current) questionRef.current.blur()
    } catch (err) {
      setSupportError("Failed to submit your question. Please try again later.")
    } finally {
      setSupportLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Everything you need to know about Free Redeem Code Daily - your ultimate gaming rewards platform
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl max-h-[500px] overflow-y-auto">
          <div className="w-full space-y-4">
            {loading ? (
              <div className="text-center py-8 text-purple-400 animate-pulse">Loading FAQ...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-400">{error}</div>
            ) : faqData.length === 0 ? (
              <div className="text-center py-8 text-slate-400">No FAQ found.</div>
            ) : (
              faqData.map((faq, idx) => (
                <div
                  key={faq.id || idx}
                  className="border border-slate-700/30 rounded-xl bg-slate-800/30 backdrop-blur-sm px-6 py-2 hover:bg-slate-700/30 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(faq.id || idx)}
                    className="w-full text-left hover:no-underline group py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {iconMap[faq.icon] || <HelpCircle className="w-5 h-5 text-purple-400" />}
                      </div>
                      <span className="text-white font-medium text-lg group-hover:text-purple-300 transition-colors duration-200">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        openItem === (faq.id || idx) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openItem === (faq.id || idx) && (
                    <div className="text-slate-300 leading-relaxed pl-8 pr-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-slate-300 mb-6">
            Can't find what you're looking for? Our support team is here to help you get the most out of your gaming
            rewards experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              Contact Support
            </button>
          </div>

          {/* Support Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-slate-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-purple-500/30">
                <button
                  className="absolute top-4 right-4 text-slate-400 hover:text-pink-400 text-xl"
                  onClick={() => {
                    setShowModal(false)
                    setSupportError("")
                    setSupportSuccess("")
                  }}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Contact Support</h2>
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <input
                    type="email"
                    className="w-full p-3 rounded-lg bg-slate-800 border border-purple-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your email address (required)"
                    value={supportEmail}
                    onChange={e => setSupportEmail(e.target.value)}
                    required
                  />
                  <textarea
                    ref={questionRef}
                    className="w-full h-28 p-3 rounded-lg bg-slate-800 border border-purple-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your issue or question..."
                    value={supportQuestion}
                    onChange={e => setSupportQuestion(e.target.value)}
                    required
                  />
                  {supportError && <div className="text-red-400 text-sm">{supportError}</div>}
                  {supportSuccess && <div className="text-green-400 text-sm">{supportSuccess}</div>}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    disabled={supportLoading}
                  >
                    {supportLoading ? "Submitting..." : "Submit Question"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQ

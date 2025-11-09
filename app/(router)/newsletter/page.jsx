'use client'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Mail, Send, CheckCircle, Bell, Sparkles, TrendingUp, BookOpen, Award } from 'lucide-react'
import Link from 'next/link'

function NewsletterPage() {
  const { user, isLoaded } = useUser()
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    
    if (!user) {
      window.location.href = '/sign-in'
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true)
      setLoading(false)
    }, 1500)
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Weekly Learning Tips',
      description: 'Get expert advice and study techniques delivered to your inbox',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: 'New Course Alerts',
      description: 'Be the first to know about new courses and content updates',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Exclusive Resources',
      description: 'Access subscriber-only guides, templates, and bonus materials',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Sparkles,
      title: 'Special Offers',
      description: 'Receive early-bird discounts and promotional codes',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const recentNewsletters = [
    {
      title: '5 Tips to Master React in 2025',
      date: 'Nov 1, 2025',
      category: 'Development',
      image: '🚀'
    },
    {
      title: 'The Future of Online Learning',
      date: 'Oct 25, 2025',
      category: 'Industry',
      image: '🎓'
    },
    {
      title: 'Study Techniques That Actually Work',
      date: 'Oct 18, 2025',
      category: 'Tips',
      image: '📚'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
            <Bell className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="text-blue-600 font-semibold text-sm">Weekly Newsletter</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Stay in the Loop
          </h1>
          
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Join thousands of learners getting weekly insights, tips, and exclusive content
          </p>
        </div>

        {/* Subscription Form */}
        <div className="max-w-2xl mx-auto mb-16">
          {subscribed ? (
            <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-green-200 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                You're Subscribed! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Check your inbox for a confirmation email. You'll receive our next newsletter soon!
              </p>
              <Link
                href="/course"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Subscribe to Our Newsletter</h2>
              </div>

              {user ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to receive weekly newsletters and can unsubscribe at any time
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Subscribe Now
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-6">
                    Sign in to subscribe to our newsletter
                  </p>
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <Mail className="w-5 h-5" />
                    Sign In to Subscribe
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What You'll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-300 transition-all hover:-translate-y-1 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Newsletters */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recent Newsletters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNewsletters.map((newsletter, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-blue-300 transition-all hover:-translate-y-1 group cursor-pointer"
              >
                <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
                  {newsletter.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
                      {newsletter.category}
                    </span>
                    <span className="text-xs text-gray-500">{newsletter.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {newsletter.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
            <div>
              <p className="text-3xl font-bold text-blue-600">10K+</p>
              <p className="text-sm text-gray-600">Subscribers</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <p className="text-3xl font-bold text-purple-600">95%</p>
              <p className="text-sm text-gray-600">Open Rate</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <p className="text-3xl font-bold text-pink-600">Weekly</p>
              <p className="text-sm text-gray-600">Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsletterPage

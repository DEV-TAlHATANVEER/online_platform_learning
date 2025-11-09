'use client'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Check, Crown, Zap, Star, Shield, Award, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

function MembershipPage() {
  const { user, isLoaded } = useUser()
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' or 'yearly'

  const plans = [
    {
      name: 'Free',
      price: 0,
      icon: Star,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Perfect for getting started',
      features: [
        'Access to free courses',
        'Basic course materials',
        'Community forum access',
        'Monthly newsletter',
        'Course completion certificates'
      ],
      limitations: [
        'Limited course selection',
        'No premium content',
        'Standard support'
      ],
      cta: user ? 'Current Plan' : 'Sign Up Free',
      recommended: false
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 29 : 290,
      icon: Zap,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Most popular for learners',
      features: [
        'All Free features',
        'Unlimited premium courses',
        'Download course materials',
        'Priority support',
        'Advanced certificates',
        'Ad-free experience',
        'Early access to new courses',
        'Personalized learning paths'
      ],
      cta: 'Upgrade to Pro',
      recommended: true,
      savings: billingCycle === 'yearly' ? 'Save $58' : null
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 99 : 990,
      icon: Crown,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      description: 'For teams and organizations',
      features: [
        'All Pro features',
        'Team management dashboard',
        'Custom learning paths',
        'Advanced analytics',
        'Dedicated account manager',
        'API access',
        'Custom branding',
        'Bulk licenses',
        '24/7 premium support'
      ],
      cta: 'Contact Sales',
      recommended: false,
      savings: billingCycle === 'yearly' ? 'Save $198' : null
    }
  ]

  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
            <Crown className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600 font-semibold text-sm">Premium Membership</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Choose Your Learning Path
          </h1>
          
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-8">
            Unlock unlimited access to premium courses and accelerate your learning journey
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon
            const colors = colorClasses[plan.color]
            
            return (
              <div
                key={plan.name}
                className={`
                  relative bg-white rounded-3xl shadow-xl overflow-hidden
                  transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                  ${plan.recommended ? 'ring-4 ring-purple-500 scale-105' : 'border-2 border-gray-200'}
                `}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    RECOMMENDED
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6 ${plan.recommended ? 'animate-pulse' : ''}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        ${plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500">
                          /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      )}
                    </div>
                    {plan.savings && (
                      <p className="text-green-600 font-semibold text-sm mt-2">{plan.savings}</p>
                    )}
                  </div>

                  {/* CTA Button */}
                  {user || plan.name === 'Free' ? (
                    <button
                      className={`
                        w-full py-4 rounded-xl font-bold text-lg mb-6 transition-all
                        ${plan.recommended
                          ? 'bg-gradient-to-r ' + plan.gradient + ' text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <Link
                      href="/sign-up"
                      className={`
                        w-full py-4 rounded-xl font-bold text-lg mb-6 transition-all block text-center
                        bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl
                      `}
                    >
                      Sign Up to Continue
                    </Link>
                  )}

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-start gap-3 opacity-50">
                          <span className="text-gray-400 text-sm">• {limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Plans Include
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Secure Learning', desc: 'Industry-standard security' },
              { icon: Award, title: 'Certificates', desc: 'Shareable credentials' },
              { icon: Zap, title: 'Mobile Access', desc: 'Learn on any device' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ or Additional Info */}
        {!user && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
              <span>New here?</span>
              <Link href="/sign-up" className="underline flex items-center gap-1">
                Create an account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MembershipPage

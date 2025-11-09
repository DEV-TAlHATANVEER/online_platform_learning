'use client'
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import HyperGraphql from '@/app/(router)/_utils/HyperGraphql'
import { Check, Lock, Sparkles, Loader2, CreditCard, Gift, AlertCircle } from 'lucide-react'

function EnrollmentButton({ course, paymentSuccess }) {
  const { user, isLoaded } = useUser()
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [checking, setChecking] = useState(false)
  const [showManualEnroll, setShowManualEnroll] = useState(false)
  const [manualEnrollAttempts, setManualEnrollAttempts] = useState(0)

  // Persist payment success state in localStorage
  useEffect(() => {
    if (paymentSuccess && course) {
      localStorage.setItem(`payment_success_${course.slug}`, 'true')
    }
  }, [paymentSuccess, course])

  // Check if payment was successful (from URL or localStorage)
  const hasPaymentSucceeded = () => {
    if (paymentSuccess) return true
    if (course && localStorage.getItem(`payment_success_${course.slug}`) === 'true') {
      return true
    }
    return false
  }

  useEffect(() => {
    if (isLoaded && user && course) {
      checkEnrollment()
    } else if (isLoaded) {
      setLoading(false)
    }
  }, [isLoaded, user, course])

  // Auto-check enrollment after payment
  useEffect(() => {
    if (hasPaymentSucceeded() && user && course && !isEnrolled) {
      setShowManualEnroll(true)
      
      // Auto-check enrollment status
      let attempts = 0
      const maxAttempts = 10
      
      const checkInterval = setInterval(async () => {
        attempts++
        console.log(`Auto-checking enrollment... Attempt ${attempts}/${maxAttempts}`)
        
        const enrolled = await checkEnrollment()
        
        if (enrolled) {
          clearInterval(checkInterval)
          // Clear localStorage on successful enrollment
          localStorage.removeItem(`payment_success_${course.slug}`)
          setShowManualEnroll(false)
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval)
          console.log('Auto-check complete, showing manual button')
        }
      }, 2000)

      return () => clearInterval(checkInterval)
    }
  }, [paymentSuccess, user, course, isEnrolled])

  const checkEnrollment = async () => {
    if (!user || !course) return false
    
    try {
      setChecking(true)
      const enrollment = await HyperGraphql.checkUserEnrollment(
        user.primaryEmailAddress.emailAddress,
        course.slug
      )
      
      if (enrollment) {
        setIsEnrolled(true)
        // Clear payment success flag when enrolled
        localStorage.removeItem(`payment_success_${course.slug}`)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error checking enrollment:', error)
      return false
    } finally {
      setLoading(false)
      setChecking(false)
    }
  }

  const handleManualEnroll = async () => {
    if (!user || !course) return
    
    setProcessing(true)
    setError(null)
    setManualEnrollAttempts(prev => prev + 1)
    
    try {
      const response = await fetch('/api/enroll-after-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.primaryEmailAddress.emailAddress,
          courseSlug: course.slug
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Enrollment failed')
      }

      console.log('✅ Manual enrollment successful:', data)
      
      // Clear payment success flag
      localStorage.removeItem(`payment_success_${course.slug}`)
      setIsEnrolled(true)
      setShowManualEnroll(false)
      
      // Refresh the page to update all components
      setTimeout(() => {
        window.location.reload()
      }, 1500)
      
    } catch (error) {
      console.error('❌ Manual enrollment error:', error)
      setError(error.message)
    } finally {
      setProcessing(false)
    }
  }

  const handleFreeEnroll = async () => {
    if (!user) {
      window.location.href = '/sign-in'
      return
    }

    setProcessing(true)
    setError(null)
    
    try {
      await HyperGraphql.enrollUserInCourse(
        user.primaryEmailAddress.emailAddress,
        course.slug,
        course.id
      )
      setIsEnrolled(true)
      setTimeout(() => setProcessing(false), 1000)
    } catch (error) {
      console.error('Error enrolling:', error)
      setError('Failed to enroll. Please try again.')
      setProcessing(false)
    }
  }

  const handlePaidEnroll = async () => {
    if (!user) {
      window.location.href = '/sign-in'
      return
    }

    setProcessing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          courseName: course.name,
          coursePrice: 49.99,
          courseSlug: course.slug,
          userEmail: user.primaryEmailAddress.emailAddress,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.url) {
        throw new Error('No checkout URL returned from server')
      }

      window.location.href = data.url
      
    } catch (error) {
      console.error('Error creating checkout:', error)
      setError(error.message || 'Failed to initiate payment. Please try again.')
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="mt-6 w-full h-16 bg-gray-200 rounded-xl animate-pulse"></div>
    )
  }

  // Show enrolled state - This takes priority
  if (isEnrolled) {
    return (
      <div className="mt-6">
        <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full animate-bounce shadow-md">
            <Check className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-700">You're Enrolled! 🎉</h3>
            <p className="text-sm text-green-600">Access all chapters below and start learning now</p>
          </div>
        </div>
      </div>
    )
  }

  // Show manual enrollment if payment succeeded but not enrolled yet
  if (showManualEnroll && user) {
    return (
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl shadow-lg">
          <div className="flex items-center justify-center w-12 h-12">
            {checking ? (
              <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            ) : (
              <AlertCircle className="w-7 h-7 text-blue-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-800">
              {checking ? 'Verifying Payment...' : 'Payment Received! 💳'}
            </h3>
            <p className="text-sm text-blue-700">
              {checking 
                ? 'Please wait while we activate your course access' 
                : 'Click below to complete your enrollment'}
            </p>
          </div>
        </div>

        {!checking && (
          <button
            onClick={handleManualEnroll}
            disabled={processing}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Activating Course Access...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Complete Enrollment & Start Learning
              </span>
            )}
          </button>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-500">
          Having trouble? Refresh the page or contact support
        </p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mt-6">
        <button
          onClick={() => window.location.href = '/sign-in'}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center gap-3">
            <Lock className="w-6 h-6" />
            <span>Sign In to Enroll</span>
          </div>
        </button>
      </div>
    )
  }

  if (course?.free) {
    return (
      <div className="mt-6">
        <button
          onClick={handleFreeEnroll}
          disabled={processing}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          
          <div className="relative flex items-center justify-center gap-3">
            {processing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Enrolling...</span>
              </>
            ) : (
              <>
                <Gift className="w-6 h-6 group-hover:animate-bounce" />
                <span>Enroll for FREE</span>
                <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
              </>
            )}
          </div>
        </button>
        
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <p className="text-center text-sm text-green-600 font-semibold mt-3 animate-pulse">
          ✨ 100% Free • No Credit Card Required
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-3">
      <button
        onClick={handlePaidEnroll}
        disabled={processing}
        className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        <div className="relative flex items-center justify-center gap-3">
          {processing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Redirecting to checkout...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-6 h-6" />
              <span>Buy Now - $49.99</span>
              <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
            </>
          )}
        </div>
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <Lock className="w-4 h-4" />
        <span>Secure payment powered by Stripe</span>
      </div>
      
      <div className="text-center">
        <p className="text-xs text-gray-500">
          30-day money-back guarantee • Lifetime access
        </p>
      </div>
    </div>
  )
}

export default EnrollmentButton

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Gift, Star, ArrowRight, Check, Award, Shield, Sparkles } from "lucide-react"
import { toast } from "react-toastify"
import Image from "next/image"
const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}
export default function LuxuryPromoBanner({
  onSubmit,
}: { onSubmit?: (email: string, phone: string, name: string) => void }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const daysRemaining = 7

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (!name.trim()) {
      toast.error("Please enter your name")
      return
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number")
      return
    }

    setIsSubmitting(true)

    if (onSubmit) {
      onSubmit(email, phone, name)
      setTimeout(() => {
        setIsSubmitting(false)
        toast.success("Thank you! Our team will contact you within 24 hours with exclusive details.")
        setEmail("")
        setName("")
        setPhone("")
      }, 1000)
    } else {
      setTimeout(() => {
        toast.success("Thank you for your interest! Your exclusive access details will be sent to your email.")
        setIsSubmitting(false)
        setEmail("")
        setName("")
        setPhone("")
      }, 1000)
    }
  }

  return (
    <div className="relative rounded-2xl w-full overflow-hidden bg-gradient-to-br from-gold-900 via-gold-800 to-gold-700 mb-12">
      {/* Luxury Background Elements */}
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-500/20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-gold-300/30 to-gold-400/20 blur-3xl"></div>
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/10 blur-xl"></div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="container relative mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column - Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Image loader={imageLoader} src="/lts.png" alt="Kings Developers Lotus" width={200} height={80} className="object-contain" />
            </div>

            {/* Premium Badge */}
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-gradient-to-br from-gold-400 to-gold-500 p-2">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium uppercase tracking-wider text-gold-100">
                  Exclusive Pre-Launch Collection
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-gold-300 fill-current" />
                  <Star className="h-4 w-4 text-gold-300 fill-current" />
                  <Star className="h-4 w-4 text-gold-300 fill-current" />
                  <Star className="h-4 w-4 text-gold-300 fill-current" />
                  <Star className="h-4 w-4 text-gold-300 fill-current" />
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h2 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                Elevate Your
                <span className="block text-gold-300">Living Experience</span>
              </h2>

              <p className="max-w-xl text-lg text-gold-50/90 leading-relaxed">
                Be among the first to secure your dream property in our newest prestigious development. Early
                registrants receive exclusive benefits and priority selection in Kenya's most coveted locations.
              </p>
            </div>

            {/* Premium Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="rounded-full bg-gold-400/20 p-2">
                  <Check className="h-4 w-4 text-gold-200" />
                </div>
                <span className="text-gold-100 font-medium">Prime Locations</span>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="rounded-full bg-gold-400/20 p-2">
                  <Sparkles className="h-4 w-4 text-gold-200" />
                </div>
                <span className="text-gold-100 font-medium">Luxury Finishes</span>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="rounded-full bg-gold-400/20 p-2">
                  <Shield className="h-4 w-4 text-gold-200" />
                </div>
                <span className="text-gold-100 font-medium">Guaranteed ROI</span>
              </div>
            </div>

          </div>

          {/* Right column - Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white/15 backdrop-blur-md p-8 border border-white/20 shadow-2xl">
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="rounded-full bg-gradient-to-br from-gold-400 to-gold-500 p-2">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Exclusive Access</h3>
                </div>
                <p className="text-gold-100/90">
                  Register now to secure your priority position and receive exclusive launch benefits
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="promo-name" className="text-sm font-medium text-gold-100 block">
                    Full Name *
                  </label>
                  <input
                    id="promo-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder:text-gold-100/60 focus:border-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-300/30 transition-all duration-300"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="promo-email" className="text-sm font-medium text-gold-100 block">
                    Email Address *
                  </label>
                  <input
                    id="promo-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder:text-gold-100/60 focus:border-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-300/30 transition-all duration-300"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label htmlFor="promo-phone" className="text-sm font-medium text-gold-100 block">
                    Phone Number *
                  </label>
                  <input
                    id="promo-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder:text-gold-100/60 focus:border-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-300/30 transition-all duration-300"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="group w-full h-12 rounded-xl bg-gradient-to-r from-white to-gold-50 hover:from-gold-50 hover:to-white text-gold-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gold-800/30 border-t-gold-800"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Secure My Priority Access
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Trust Indicators */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-center text-sm text-gold-100/80">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>100% Secure. No spam. Unsubscribe anytime.</span>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <p className="text-center text-xs text-gold-100/70 leading-relaxed">
                    By registering, you'll receive exclusive updates about our premium property launches, special
                    investor rates, and priority access to our most sought-after developments.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="bg-gradient-to-r from-gold-500/10 to-gold-400/10 rounded-lg p-4 border border-gold-400/20">
                  <h4 className="font-semibold text-gold-200 mb-2 text-sm">Your Exclusive Benefits:</h4>
                  <ul className="space-y-1 text-xs text-gold-100/80">
                    <li className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-gold-400"></div>
                      <span>Priority property selection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-gold-400"></div>
                      <span>Exclusive early bird pricing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-gold-400"></div>
                      <span>Personal investment consultation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-gold-400"></div>
                      <span>VIP launch event invitation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

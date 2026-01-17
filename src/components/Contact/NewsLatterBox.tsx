"use client"

import axios from "axios"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, User, Bell, TrendingUp, MapPin, DollarSign, Sparkles } from "lucide-react"

const LuxuryNewsletterBox = () => {
  const { theme } = useTheme()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [honey, setHoney] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href)
    }
  }, [])

  const validateForm = () => {
    if (!name || !email) {
      toast.error("Name and email are required")
      return false
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address")
      return false
    }

    return true
  }

  const submit = (e: any) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      axios
        .post("https://kingsdevelopersapi.co.ke/subscribe", { name, email, url, honey })
        .then(() => {
          toast.success("Welcome to our exclusive newsletter! Check your email for confirmation.")
          setName("")
          setEmail("")
        })
        .catch(() => toast.error("Subscription failed. Please try again."))
        .finally(() => setLoading(false))
    }
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gold-50/50 shadow-2xl border-0">
      {/* Luxury Background Elements */}
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-500/10 blur-2xl"></div>
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-tr from-gold-300/20 to-gold-400/10 blur-2xl"></div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent"></div>
      </div>

      <CardHeader className="relative space-y-4 pb-6">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-gradient-to-br from-gold-400 to-gold-500 p-3">
            <Bell className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="font-serif text-2xl font-bold text-gray-900">Exclusive Market Intelligence</CardTitle>
            <CardDescription className="text-gray-600 mt-1">Stay ahead in Kenya's real estate market</CardDescription>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Join our exclusive community of savvy investors and get insider access to Kenya's most promising real estate
            opportunities.
          </p>

          {/* Newsletter Benefits */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 text-gold-500" />
              <span>Market Trends</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gold-500" />
              <span>Prime Locations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <DollarSign className="h-4 w-4 text-gold-500" />
              <span>Investment Tips</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4 text-gold-500" />
              <span>Exclusive Deals</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        <form onSubmit={submit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="newsletter-name" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <User className="h-4 w-4 text-gold-500" />
              <span>Your Name</span>
            </Label>
            <Input
              id="newsletter-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="h-11 border-gray-200 focus:border-gold-400 focus:ring-gold-400/20 bg-white/80 backdrop-blur-sm transition-all duration-300"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="newsletter-email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gold-500" />
              <span>Your Email</span>
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-11 border-gray-200 focus:border-gold-400 focus:ring-gold-400/20 bg-white/80 backdrop-blur-sm transition-all duration-300"
              required
            />
          </div>

          {/* Honeypot Field */}
          <input
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            type="number"
            placeholder="Enter your value Number"
            className="hidden"
            tabIndex={-1}
          />

          {/* Subscribe Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                Subscribing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Subscribe to Exclusive Updates
                <Mail className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </form>

        {/* Subscription Benefits */}
        <div className="p-4 bg-gradient-to-r from-gold-50 to-gold-100/50 rounded-lg border border-gold-200/50">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Sparkles className="h-4 w-4 text-gold-500 mr-2" />
            What you'll receive:
          </h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gold-500"></div>
              <span>Weekly market analysis and trends</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gold-500"></div>
              <span>Exclusive property launch notifications</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gold-500"></div>
              <span>Investment tips from our experts</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gold-500"></div>
              <span>Early access to premium listings</span>
            </li>
          </ul>
        </div>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          We respect your privacy. Unsubscribe at any time.
          <br />
          <span className="text-gold-600">No spam, just valuable insights.</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default LuxuryNewsletterBox

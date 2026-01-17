"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, MessageSquare, Send, Clock, Shield, CheckCircle } from "lucide-react"

const LuxuryContactForm = () => {
  const [name, setName] = useState("")
  const [honey, setHoney] = useState(null)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href)
    }
  }, [])

  const validateForm = () => {
    if (!name || !email || !phone || !message) {
      toast.error("All fields are required")
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
        .post("https://kingsdevelopersapi.co.ke/send-sales", { name, honey, email, phone, message, url })
        .then(() => {
          toast.success("Thank you! Your message has been sent successfully. We'll respond within 24 hours.")
          setName("")
          setEmail("")
          setPhone("")
          setMessage("")
        })
        .catch(() => toast.error("Message could not be sent. Please try again or call us directly."))
        .finally(() => setLoading(false))
    }
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gold-50/30 shadow-2xl border-0">
      {/* Background Elements */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-500/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-gradient-to-tr from-gold-300/20 to-gold-400/10 blur-3xl"></div>

      <CardHeader className="relative space-y-4 pb-6">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-gradient-to-br from-gold-400 to-gold-500 p-3">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="font-serif text-3xl font-bold text-gray-900">Need Help? Get In Touch</CardTitle>
            <CardDescription className="text-gray-600 mt-2 text-base">
              Expert guidance for your real estate journey in Kenya
            </CardDescription>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Whether you're seeking your dream home, a savvy investment property, or expert guidance in the Kenyan real
            estate market, Kings Developers is your trusted partner for all things real estate!
          </p>

          {/* Response Time Indicator */}
          <div className="flex items-center space-x-2 text-sm text-gold-700 bg-gold-50 rounded-lg p-3">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Typical response time: Within 24 hours</span>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="rounded-full bg-gold-100 p-2 w-fit mx-auto mb-2">
                <CheckCircle className="h-4 w-4 text-gold-600" />
              </div>
              <span className="text-xs text-gray-600">Licensed Experts</span>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-gold-100 p-2 w-fit mx-auto mb-2">
                <Shield className="h-4 w-4 text-gold-600" />
              </div>
              <span className="text-xs text-gray-600">Secure & Private</span>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-gold-100 p-2 w-fit mx-auto mb-2">
                <Clock className="h-4 w-4 text-gold-600" />
              </div>
              <span className="text-xs text-gray-600">Quick Response</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <User className="h-4 w-4 text-gold-500" />
                <span>Your Name *</span>
              </Label>
              <Input
                id="contact-name"
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
              <Label htmlFor="contact-email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold-500" />
                <span>Your Email *</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-11 border-gray-200 focus:border-gold-400 focus:ring-gold-400/20 bg-white/80 backdrop-blur-sm transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gold-500" />
              <span>Your Phone Number *</span>
            </Label>
            <Input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="h-11 border-gray-200 focus:border-gold-400 focus:ring-gold-400/20 bg-white/80 backdrop-blur-sm transition-all duration-300"
              required
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="contact-message" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-gold-500" />
              <span>Your Message *</span>
            </Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your real estate needs, budget, preferred location, or any questions you have..."
              rows={5}
              className="border-gray-200 focus:border-gold-400 focus:ring-gold-400/20 bg-white/80 backdrop-blur-sm transition-all duration-300 resize-none"
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                Sending Message...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Send Message
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </form>

        {/* Contact Information */}
        <div className="mt-8 p-6 bg-gradient-to-r from-gold-50 to-gold-100/50 rounded-lg border border-gold-200/50">
          <h4 className="font-semibold text-gray-900 mb-4">Prefer to reach us directly?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gold-500" />
              <span className="text-gray-700">+254 700 000 000</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gold-500" />
              <span className="text-gray-700">info@kingsdevelopers.com</span>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
          Your information is secure and will only be used to respond to your inquiry.
          <br />
          <span className="text-gold-600">We respect your privacy and never share your details.</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default LuxuryContactForm

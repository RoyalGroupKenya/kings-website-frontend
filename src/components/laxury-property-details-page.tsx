"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Mail,
  CheckCircle,
  Star,
  Share2,
  Heart,
  Shield,
  Camera,
  Play,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  Maximize2,
  Send,
  ChefHat,
  X,
  ChevronDown,
  Calculator,
} from "lucide-react"
import { toast } from "sonner"
import axios from "axios"

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const normalizeStatus = (status?: string | null) => (typeof status === "string" ? status.trim().toLowerCase() : "")
const isCompletedStatus = (status?: string | null) => normalizeStatus(status) === "completed"

// Mobile-Optimized Property Carousel Component
const PropertyCarousel = ({ images, onImageClick }: { images: string[]; onImageClick: (index: number) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isAutoPlaying || !images?.length) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images?.length, isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsAutoPlaying(false)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) nextSlide()
    if (isRightSwipe) prevSlide()
  }

  if (!images?.length) return null

  return (
    <div className="relative w-full">
      {/* Main Carousel */}
      <div
        ref={carouselRef}
        className="relative h-[50vh] w-full sm:h-[60vh] lg:h-[70vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image */}
        <div className="relative w-full h-full">
          <Image
            loader={imageLoader}
            src={`https://kingsdevelopersapi.co.ke${images[currentIndex]}` || "/placeholder.svg"}
            alt={`Property image ${currentIndex + 1}`}
            fill
            className="object-cover transition-all duration-700"
            // FIX: Removed the 'priority' prop. While good for static hero images,
            // it can cause memory overload and crashes on mobile devices when used
            // in a component that loads multiple high-res images.
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
        </div>

        {/* Navigation Arrows - Hidden on mobile, shown on hover for desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg opacity-0 sm:group-hover:opacity-100 md:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-navy-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg opacity-0 sm:group-hover:opacity-100 md:opacity-100"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-navy-800" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute  bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Mobile-Optimized Action Buttons */}
        <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-2 sm:gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onImageClick(currentIndex)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
          >
            <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-navy-800" />
          </button>
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-navy-800" />
          </button>
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-navy-800" />
          </button>
        </div>

      

        {/* Auto-play indicator */}
        <div className="absolute top-3 sm:top-6 left-3 sm:left-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-lg ${
              isAutoPlaying ? "bg-gold-500/90 text-white" : "bg-white/90 text-navy-800"
            }`}
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Mobile-Optimized Contact Form Component
const ContactForm = ({ property, agent }: { property: any; agent: any }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${property.name} and would like to schedule a viewing.`,
    inquiryType: "viewing",
    honey: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const cleanPrice = property?.price ? property.price.replace(/[^0-9]/g, "") : ""
  const calculatorHref = cleanPrice
    ? `/investment-calculator?price=${cleanPrice}`
    : "/investment-calculator"

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    let newMessage = ""
    switch (formData.inquiryType) {
      case "viewing":
        newMessage = `I'm interested in ${property.name} and would like to schedule a viewing.`
        break
      case "info":
        newMessage = `I would like to request more information about ${property.name}.`
        break
      case "pricing":
        newMessage = `Could you please provide me with the pricing details for ${property.name}?`
        break
      case "financing":
        newMessage = `I'm interested in the financing options available for ${property.name}.`
        break
      default:
        newMessage = `I'm interested in ${property.name}.`
    }
    setFormData((prev) => ({ ...prev, message: newMessage }))
  }, [formData.inquiryType, property.name])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Full name is required."
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid."
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required."
    } else if (!/^\+?[0-9\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number."
    }
    if (formData.honey) return false

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      toast("Incomplete Form", {
        description: "Please fill out all required fields correctly.",
      })
      return
    }

    setIsSubmitting(true)
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      honey: formData.honey,
      url: window.location.href,
    }

    try {
      await axios.post("https://kingsdevelopersapi.co.ke/send-sales", payload)
      toast("Inquiry Sent", {
        description: "We have received your inquiry and will get back to you shortly.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `I'm interested in ${property.name} and would like to schedule a viewing.`,
        inquiryType: "viewing",
        honey: "",
      })
      setErrors({})
    } catch (error) {
      console.error("Submission failed:", error)
      toast("Uh oh! Something went wrong.", {
        description: "Your message could not be sent. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const showForm = isClient ? isExpanded || window.innerWidth >= 1024 : isExpanded

  return (
    <Card className="border-0 shadow-lg sm:shadow-xl bg-white">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {/* Mobile-Collapsible Header */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full mb-4 p-4 bg-ivory-50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/30 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold-600" />
              </div>
              <div className="text-left">
                <h4 className="font-playfair text-lg font-light text-navy-800">Contact Agent</h4>
                <p className="text-gold-600 font-montserrat font-medium text-sm">Get in touch</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Agent Info - Always visible on desktop, collapsible on mobile */}
        <div className={`${showForm ? "block" : "hidden lg:block"}`}>
          <div className="flex items-center mb-6 sm:mb-8 p-4 sm:p-6 bg-ivory-50 rounded-xl sm:rounded-2xl">
            <div className="flex-1">
              <h4 className="font-playfair text-lg sm:text-xl font-light text-navy-800 mb-1">Kings Developers</h4>
              <p className="text-gold-600 font-montserrat font-medium text-sm">Sales Executive</p>
            </div>
            <div className="flex gap-2">
              <Link href={`tel:${agent.phone}`}>
                <Button size="sm" className="bg-gold-500 hover:bg-gold-600 text-navy-900 rounded-full">
                  <Phone className="w-4 h-4" />
                </Button>
              </Link>
              <Link href={`mailto:${agent.email}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-navy-200 text-navy-700 rounded-full bg-transparent"
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
            {/* Inquiry Type */}
            <div>
              <Label className="text-navy-700 font-montserrat font-medium mb-3 block text-sm sm:text-base">
                I'm interested in:
              </Label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { value: "viewing", label: "Schedule Viewing" },
                  { value: "info", label: "More Information" },
                  { value: "pricing", label: "Pricing Details" },
                  { value: "financing", label: "Financing Options" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, inquiryType: option.value })}
                    className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-montserrat font-medium transition-all duration-300 ${
                      formData.inquiryType === option.value
                        ? "border-gold-500 bg-gold-50 text-gold-700"
                        : "border-navy-200 text-navy-600 hover:border-gold-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden">
              <Label htmlFor="honey">Honeypot</Label>
              <Input
                id="honey"
                name="honey"
                value={formData.honey}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Personal Information */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-navy-700 font-montserrat font-medium mb-2 block text-sm sm:text-base"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`border-navy-200 focus:border-gold-500 focus:ring-gold-500/20 rounded-lg sm:rounded-xl text-sm sm:text-base ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  className="text-navy-700 font-montserrat font-medium mb-2 block text-sm sm:text-base"
                >
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`border-navy-200 focus:border-gold-500 focus:ring-gold-500/20 rounded-lg sm:rounded-xl text-sm sm:text-base ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  placeholder="+254 700 000 000"
                />
                {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-navy-700 font-montserrat font-medium mb-2 block text-sm sm:text-base"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`border-navy-200 focus:border-gold-500 focus:ring-gold-500/20 rounded-lg sm:rounded-xl text-sm sm:text-base ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label
                htmlFor="message"
                className="text-navy-700 font-montserrat font-medium mb-2 block text-sm sm:text-base"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="border-navy-200 focus:border-gold-500 focus:ring-gold-500/20 rounded-lg sm:rounded-xl resize-none text-sm sm:text-base"
                placeholder="Tell us more about your requirements..."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 py-3 sm:py-4 font-montserrat font-semibold rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin mr-2" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>

            {/* Payment Plan Calculator Button */}
            <div className="pt-4 sm:pt-6 border-t border-navy-100">
              <Link href={calculatorHref} className="block mb-4">
                <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base py-3 sm:py-4">
                  <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Build Your Payment Plan
                </Button>
              </Link>
            </div>

            {/* Quick Contact Options */}
            <div className="pt-2 sm:pt-4 border-t border-navy-100">
              <p className="text-navy-600/70 text-xs sm:text-sm text-center mb-3 sm:mb-4">Or contact us directly:</p>
              <div className="flex gap-2 sm:gap-3">
                <Link href={`tel:${agent.phone}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-navy-200 text-navy-700 hover:bg-navy-50 rounded-lg sm:rounded-xl bg-transparent text-xs sm:text-sm"
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Call Now
                  </Button>
                </Link>
                <Link href={`https://wa.me/${agent.phone.replace(/\D/g, "")}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-navy-200 text-navy-700 hover:bg-navy-50 rounded-lg sm:rounded-xl bg-transparent text-xs sm:text-sm"
                  >
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

// Tag Component
const TagButton = ({ text }: { text: string }) => (
  <span className="inline-block bg-gold-100 text-gold-800 text-xs sm:text-sm font-montserrat font-medium px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full mr-2 mb-2">
    {text}
  </span>
)

// Share Component
const SharePost = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <Button size="sm" variant="outline" className="rounded-full bg-transparent">
      <Share2 className="w-4 h-4" />
    </Button>
  </div>
)

// Mobile-Optimized Lightbox Component
const Lightbox = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: string[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-4">
        <Image
          loader={imageLoader}
          src={`https://kingsdevelopersapi.co.ke${images[currentIndex]}`}
          alt={`Property image ${currentIndex + 1}`}
          fill
          className="object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}

export default function LuxuryPropertyDetailsPage({
  propertyData,
  relatedProperties,
}: {
  propertyData: any
  relatedProperties: any[]
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % propertyData.images.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length)
  }

  const isPropertyCompleted = isCompletedStatus(propertyData?.status)

  return (
    <div className="bg-ivory-50 font-inter pt-10 overflow-x-hidden">
      {/* Hero Section with Carousel */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile-Optimized Breadcrumb */}
          <div className="flex items-center text-xs sm:text-sm text-navy-600/70 mb-6 sm:mb-8 font-montserrat overflow-x-auto">
            <Link href="/" className="hover:text-gold-600 transition-colors whitespace-nowrap">
              Home
            </Link>
            <span className="mx-1 sm:mx-2">/</span>
            <Link href="/projects" className="hover:text-gold-600 transition-colors whitespace-nowrap">
              Properties
            </Link>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-navy-800 truncate">{propertyData.name}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content - Carousel and Details */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-12">
              {/* Mobile-Optimized Property Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Badge className="bg-gold-500 text-navy-900 hover:bg-gold-600 font-montserrat font-medium text-xs sm:text-sm">
                    {propertyData.type}
                  </Badge>
                  <Badge
                    variant={propertyData.status === "Ready" ? "default" : "secondary"}
                    className="font-montserrat font-medium text-xs sm:text-sm"
                  >
                    {propertyData.status}
                  </Badge>
                </div>

                <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-navy-800 mb-4 sm:mb-6 tracking-tight leading-tight">
                  {propertyData.name}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="flex items-center text-navy-600/70">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    <span className="font-montserrat font-medium text-sm sm:text-base truncate">
                      {propertyData.location.address}
                    </span>
                  </div>
                  {!isPropertyCompleted && propertyData.price && (
                    <div className="text-2xl sm:text-3xl font-playfair font-light text-gold-600">
                      {propertyData.price}
                    </div>
                  )}
                </div>

                {/* Mobile-Optimized Key Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm">
                    <Bed className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-gold-500" />
                    <div className="font-semibold text-navy-800 text-sm sm:text-base">{propertyData.bedrooms}</div>
                    <div className="text-xs sm:text-sm text-navy-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm">
                    <Bath className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-gold-500" />
                    <div className="font-semibold text-navy-800 text-sm sm:text-base">{propertyData.bathrooms}</div>
                    <div className="text-xs sm:text-sm text-navy-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm">
                    <Square className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-gold-500" />
                    <div className="font-semibold text-navy-800 text-sm sm:text-base">{propertyData.size}</div>
                    <div className="text-xs sm:text-sm text-navy-600">Size</div>
                  </div>
                  {propertyData.kitchen && (
                    <div className="text-center p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm">
                      <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-gold-500" />
                      <div className="font-semibold text-navy-800 text-sm sm:text-base">{propertyData.kitchen}</div>
                      <div className="text-xs sm:text-sm text-navy-600">Kitchens</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Carousel */}
              <PropertyCarousel images={propertyData.images} onImageClick={openLightbox} />

              {/* Mobile-Optimized Property Details Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 bg-ivory-50 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl">
                  <TabsTrigger
                    value="overview"
                    className="rounded-lg sm:rounded-xl data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900 font-montserrat font-medium text-xs sm:text-sm"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="amenities"
                    className="rounded-lg sm:rounded-xl data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900 font-montserrat font-medium text-xs sm:text-sm"
                  >
                    Amenities
                  </TabsTrigger>
                  <TabsTrigger
                    value="location"
                    className="rounded-lg sm:rounded-xl data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900 font-montserrat font-medium text-xs sm:text-sm"
                  >
                    Location
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <h3 className="font-playfair text-xl sm:text-2xl font-light text-navy-800 mb-4 sm:mb-6">
                        Property Overview
                      </h3>
                      <div
                        className="prose prose-sm sm:prose-base prose-navy max-w-none mb-6 sm:mb-8 text-navy-700/80 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: propertyData.description }}
                      />
                      {propertyData.features?.length > 0 && (
                        <>
                          <h4 className="font-playfair text-lg sm:text-xl font-light text-navy-800 mb-3 sm:mb-4">
                            Key Features
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                            {propertyData.features.map((feature: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center p-3 sm:p-4 bg-ivory-50 rounded-lg sm:rounded-xl"
                              >
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 mr-2 sm:mr-3 flex-shrink-0" />
                                <span className="text-navy-700 font-light text-sm sm:text-base">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="amenities">
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <h3 className="font-playfair text-xl sm:text-2xl font-light text-navy-800 mb-4 sm:mb-6">
                        Premium Amenities
                      </h3>
                      {propertyData.amenities?.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                          {propertyData.amenities.map((amenity: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-start p-4 sm:p-6 bg-ivory-50 rounded-xl sm:rounded-2xl hover:bg-ivory-100 transition-colors group"
                            >
                              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gold-500/10 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-gold-500/20 transition-colors flex-shrink-0">
                                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-gold-500" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-montserrat font-semibold text-navy-800 mb-1 sm:mb-2 text-sm sm:text-base">
                                  {amenity.name}
                                </h4>
                                <p className="text-navy-600/70 text-xs sm:text-sm leading-relaxed font-light">
                                  {amenity.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-navy-600/70 text-sm sm:text-base">Amenity details will be updated soon.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location">
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <h3 className="font-playfair text-xl sm:text-2xl font-light text-navy-800 mb-4 sm:mb-6">
                        Prime Location
                      </h3>
                      <p className="text-navy-600/80 mb-6 sm:mb-8 leading-relaxed font-light text-sm sm:text-base">
                        Located in {propertyData.location.address}, this development offers excellent access to key
                        amenities and business districts.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Mobile-Optimized Tags and Share Section */}
              <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg">
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-montserrat font-semibold text-navy-800 mb-3 text-sm sm:text-base">
                      Popular Tags:
                    </h4>
                    <div className="flex flex-wrap">
                      {propertyData.tags?.map((tag: string) => (
                        <TagButton key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-Responsive Sidebar - Contact Form */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32 space-y-6 sm:space-y-8">
                <ContactForm property={propertyData} agent={propertyData.agent} />

                {/* Mobile-Optimized Developer Info */}
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                        <Image
                          loader={imageLoader}
                          src={"/new.png" || "/placeholder.svg"}
                          alt={propertyData.developer.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-playfair text-base sm:text-lg font-light text-navy-800 truncate">
                          {propertyData.developer.name}
                        </h4>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gold-500 fill-current mr-1" />
                          <span className="text-xs sm:text-sm font-medium text-navy-800">
                            {propertyData.developer.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                      <div>
                        <div className="font-semibold text-navy-800 text-sm sm:text-base">
                          {propertyData.developer.experience}
                        </div>
                        <div className="text-xs text-navy-600">Experience</div>
                      </div>
                      <div>
                        <div className="font-semibold text-navy-800 text-sm sm:text-base">
                          {propertyData.developer.projects}
                        </div>
                        <div className="text-xs text-navy-600">Projects</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Related Properties */}
      {relatedProperties?.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block w-1 h-6 sm:h-8 bg-gold-500 mb-4 sm:mb-6"></div>
              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-light text-navy-800 mb-3 sm:mb-4 tracking-tight">
                Similar Properties
              </h2>
              <p className="text-navy-600/70 max-w-2xl mx-auto font-light text-sm sm:text-base">
                Explore other exceptional properties that might interest you
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProperties.slice(0, 3).map((relatedProperty) => {
                const isRelatedCompleted = isCompletedStatus(relatedProperty?.status)
                return (
                  <Card
                    key={relatedProperty.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image
                        loader={imageLoader}
                        src={
                          `https://kingsdevelopersapi.co.ke${relatedProperty.images?.[0] || "/placeholder.svg"}` ||
                          "/placeholder.svg"
                        }
                        alt={relatedProperty.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <Badge className="bg-gold-500 text-navy-900 hover:bg-gold-600 font-montserrat font-medium text-xs">
                          {relatedProperty.type}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="font-playfair text-base sm:text-lg font-light text-navy-800 mb-2 line-clamp-2">
                        {relatedProperty.name}
                      </h3>
                      <div className="flex items-center text-xs sm:text-sm text-navy-600 mb-3">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{relatedProperty.location}</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        {!isRelatedCompleted && relatedProperty.price && (
                          <span className="text-gold-600 font-montserrat font-semibold text-sm sm:text-base">
                            {relatedProperty.price}
                          </span>
                        )}
                        <div className="flex items-center gap-2 sm:gap-3 text-xs text-navy-600">
                          <div className="flex items-center">
                            <Bed className="w-3 h-3 mr-1" />
                            {relatedProperty.bedrooms}
                          </div>
                          <div className="flex items-center">
                            <Square className="w-3 h-3 mr-1" />
                            {relatedProperty.size}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/project/${relatedProperty.name
                          .replace(/,?\s+/g, "-")
                          .toLowerCase()}_${relatedProperty.id}`}
                      >
                        <Button
                          variant="outline"
                          className="w-full border-navy-200 text-navy-700 hover:bg-navy-50 rounded-full font-montserrat font-medium bg-transparent text-xs sm:text-sm"
                        >
                          View Details
                          <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <Lightbox
        images={propertyData.images}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextLightboxImage}
        onPrev={prevLightboxImage}
      />
    </div>
  )
}

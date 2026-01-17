"use client"

import { useState, useEffect } from "react"
import { Star, Quote, Users, Award, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import type { Testimonial } from "@/types/testimonial"

// Enhanced Counter with luxury styling and intersection observer
const LuxuryCounter = ({ target, title, suffix = "", duration = 2000, icon: Icon }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById(`testimonial-counter-${title}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [title])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    let animationFrame

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration, isVisible])

  return (
    <div id={`testimonial-counter-${title}`} className="text-center group">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
        <Icon className="w-8 h-8 text-gold-500 transition-colors duration-500" />
      </div>
      <div className="text-4xl md:text-5xl font-serif font-light bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-slate-600/80 font-sans text-sm uppercase tracking-widest font-medium">{title}</div>
    </div>
  )
}

// Section header component for luxury styling
const LuxurySectionHeader = ({ eyebrow, title, description }) => {
  return (
    <div className="text-center mb-20">
      <div className="mx-auto w-1 h-12 bg-gold-500 mb-8"></div>
      <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-[0.3em] text-gold-600 uppercase rounded-full bg-gold-500/10">
        {eyebrow}
      </span>
      <h2 className="mb-6 text-5xl md:text-6xl font-serif font-light text-slate-800 tracking-tight">{title}</h2>
      <p className="max-w-3xl mx-auto text-slate-600/70 text-xl leading-relaxed font-light">{description}</p>
    </div>
  )
}

// Enhanced Testimonial Card Component
const LuxuryTestimonialCard = ({ testimonial }) => {
  return (
    <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 border border-slate-100/50 overflow-hidden">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 via-transparent to-gold-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

      {/* Quote Icon Background */}
      <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <Quote className="w-16 h-16 text-gold-500 transform rotate-12" />
      </div>

      <div className="relative p-10">
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-6">
          {[...Array(testimonial.star)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
          ))}
          <span className="ml-2 text-sm font-medium text-slate-600">({testimonial.star}.0)</span>
        </div>

        {/* Testimonial Content */}
        <blockquote className="text-slate-700 text-lg leading-relaxed font-light mb-8 italic">
          "{testimonial.content.slice(0,200)} ..."
        </blockquote>

        {/* Client Information */}
        <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/30 flex items-center justify-center text-gold-600 font-serif text-xl font-semibold shadow-lg">
              {testimonial.name.charAt(0)}
            </div>
            {/* Verified Badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Client Details */}
          <div className="flex-1">
            <h4 className="font-serif text-md font-medium text-slate-800 mb-1">{testimonial.name}</h4>
            <p className="text-gold-600 font-medium text-sm mb-1">{testimonial.designation}</p>
            <p className="text-slate-500 text-xs font-light">Verified Client</p>
          </div>

          {/* Google Logo */}
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-xs font-medium">Google</span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold-500/5 via-transparent to-gold-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  )
}

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Salome Mukiri",
    designation: "Local Guide • 8 Reviews",
    content:
      "Great apartments, they have something for everyone. Affordable, middle range, and luxury housing options. The exemplary customer service truly sets Kings Developers apart from other real estate companies in Kenya.",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Veronica Koskei",
    designation: "Property Investor",
    content:
      "Kings Developers offer a wide range of bespoke and affordable housing solutions. Their portfolio caters to different budgets and preferences. I was referred by Peter and couldn't be happier with my investment decision.",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Annie Njeri",
    designation: "First-time Home Buyer",
    content:
      "Love the affordability without compromising on quality. Kings Developers made homeownership accessible for me as a first-time buyer. James provided excellent guidance throughout the entire process.",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
  {
    id: 4,
    name: "Trizah Nje",
    designation: "Satisfied Client",
    content:
      "Affordability and accountability - that's what Kings Developers delivers. Their transparent pricing and reliable service made my property purchase stress-free. James was incredibly helpful and professional.",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 5,
    name: "Sarah Njoki",
    designation: "Property Owner",
    content:
      "Exceptional affordability and accountability throughout the entire process. Kings Developers exceeded my expectations with their professional service and quality properties. Highly recommended by James.",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 6,
    name: "Njambi Jane",
    designation: "Real Estate Investor",
    content:
      "Outstanding affordability and accountability from start to finish. The team's commitment to transparency and quality service is remarkable. James provided excellent support and guidance.",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
  {
    id: 7,
    name: "Betty Waithira",
    designation: "Happy Homeowner",
    content:
      "Perfect combination of affordability and accountability. Kings Developers delivered exactly what they promised, on time and within budget. James shared valuable insights that helped me make the right decision.",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 8,
    name: "Essy",
    designation: "Satisfied Customer",
    content:
      "Impressed by their affordability and accountability standards. The entire team maintains high professional standards while keeping properties accessible. James was instrumental in my successful purchase.",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 9,
    name: "Salome Thigwe",
    designation: "Property Buyer",
    content:
      "Excellent affordability and accountability throughout my property buying journey. Kings Developers maintains transparency and delivers quality consistently. James provided exceptional customer service.",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
  {
    id: 10,
    name: "Rogans Wanjiru",
    designation: "Investment Client",
    content:
      "Remarkable affordability and accountability in every interaction. Their commitment to client satisfaction and quality properties is evident. James offered professional guidance that made all the difference.",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 11,
    name: "Nelly Nyambura",
    designation: "Homeowner",
    content:
      "Outstanding affordability and accountability from Kings Developers. Their professional approach and quality properties make them the best choice for real estate investment. James was incredibly supportive.",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 12,
    name: "Winnie Makena",
    designation: "Long-term Client",
    content:
      "I had a fantastic experience with Kings Developers Ltd. The team was professional, efficient, and delivered beyond my expectations. Their attention to detail and commitment to quality is truly exceptional.",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
]

const LuxuryTestimonialsSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonialData.length / 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonialData.length / 3))
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + Math.ceil(testimonialData.length / 3)) % Math.ceil(testimonialData.length / 3),
    )
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const visibleTestimonials = testimonialData.slice(currentIndex * 3, currentIndex * 3 + 3)

  return (
    <section className="py-32 bg-gradient-to-br from-stone-50 to-gold-50/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gold-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-gold-500/10 blur-2xl animate-pulse delay-1000"></div>

      {/* Decorative Quote Elements */}
      <div className="absolute top-32 left-20 opacity-5">
        <Quote className="w-32 h-32 text-gold-500 transform rotate-12" />
      </div>
      <div className="absolute bottom-32 right-20 opacity-5">
        <Quote className="w-24 h-24 text-gold-500 transform -rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Luxury Section Header */}
        <LuxurySectionHeader
          eyebrow="Client Stories"
          title="What Our Clients Say"
          description="Discover why thousands of clients trust Kings Developers with their most important investment decisions. Real experiences from real people who found their perfect property with us."
        />

       

        {/* Testimonials Carousel */}
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(testimonialData.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                      {testimonialData.slice(slideIndex * 3, slideIndex * 3 + 3).map((testimonial, index) => (
                        <div
                          key={testimonial.id}
                          className="transform transition-all duration-500"
                          style={{
                            animationDelay: `${index * 200}ms`,
                          }}
                        >
                          <LuxuryTestimonialCard testimonial={testimonial} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center text-slate-700 hover:text-gold-600 transition-all duration-300 transform hover:scale-110 z-10"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center text-slate-700 hover:text-gold-600 transition-all duration-300 transform hover:scale-110 z-10"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center items-center gap-3 mt-12">
            {Array.from({ length: Math.ceil(testimonialData.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-12 h-3 bg-gradient-to-r from-gold-500 to-gold-600"
                    : "w-3 h-3 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-slate-500 hover:text-gold-600 text-sm font-medium transition-colors duration-300"
            >
              {isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-32">
          <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl max-w-5xl mx-auto border border-gold-500/10">
            <div className="text-center mb-12">
              <div className="inline-block w-1 h-8 bg-gold-500 mb-6"></div>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-slate-800 mb-6 tracking-tight">
                Join Thousands of
                <span className="block bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent font-normal">
                  Satisfied Clients
                </span>
              </h3>
              <p className="text-slate-600/80 text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                Experience the Kings Developers difference. Our commitment to excellence has earned us the trust of
                thousands of property investors across Kenya and beyond.
              </p>
            </div>

            {/* Trust Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
                  <Award className="w-8 h-8 text-gold-500" />
                </div>
                <h4 className="font-serif text-xl font-light text-slate-800 mb-3">Award-Winning Service</h4>
                <p className="text-slate-600/80 leading-relaxed font-light text-sm">
                  Recognized for excellence in customer service and property development across Kenya.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
                  <Users className="w-8 h-8 text-gold-500" />
                </div>
                <h4 className="font-serif text-xl font-light text-slate-800 mb-3">Trusted by Thousands</h4>
                <p className="text-slate-600/80 leading-relaxed font-light text-sm">
                  Over 5,000 satisfied clients have found their perfect property through our expertise.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
                  <Star className="w-8 h-8 text-gold-500" />
                </div>
                <h4 className="font-serif text-xl font-light text-slate-800 mb-3">5-Star Experience</h4>
                <p className="text-slate-600/80 leading-relaxed font-light text-sm">
                  Consistently rated 5 stars for our professional service and quality deliverables.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 px-10 py-5 text-base font-sans font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Start Your Journey
                </button>
                <button className="border-2 border-gold-500/30 text-gold-600 hover:bg-gold-50 hover:border-gold-500/50 px-10 py-5 text-base font-sans font-semibold rounded-full transition-all duration-300 bg-transparent">
                  Read More Reviews
                </button>
              </div>
              <p className="text-slate-500 text-sm mt-6 font-light">
                Join our community of satisfied property owners today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative SVG Elements with Luxury Colors */}
      <div className="absolute right-0 top-5 z-[-1] opacity-20">
        <svg width="238" height="531" viewBox="0 0 238 531" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            opacity="0.3"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#paint0_linear_luxury)"
          />
          <rect
            opacity="0.3"
            x="426.568"
            y="144.886"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 426.568 144.886)"
            fill="url(#paint1_linear_luxury)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_luxury"
              x1="517.152"
              y1="-251.373"
              x2="517.152"
              y2="459.865"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_luxury"
              x1="455.327"
              y1="-35.673"
              x2="455.327"
              y2="675.565"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-5 left-0 z-[-1] opacity-20">
        <svg width="279" height="106" viewBox="0 0 279 106" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path
              d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"
              stroke="url(#paint0_linear_luxury_wave)"
            />
            <path
              d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
              stroke="url(#paint1_linear_luxury_wave)"
            />
            <path
              d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"
              stroke="url(#paint2_linear_luxury_wave)"
            />
            <path
              d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"
              stroke="url(#paint3_linear_luxury_wave)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_luxury_wave"
              x1="256.267"
              y1="53.6717"
              x2="-40.8688"
              y2="8.15715"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F59E0B" stopOpacity="0" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_luxury_wave"
              x1="256.267"
              y1="42.6717"
              x2="-40.8688"
              y2="-2.84285"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F59E0B" stopOpacity="0" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_luxury_wave"
              x1="256.267"
              y1="64.6717"
              x2="-40.8688"
              y2="19.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F59E0B" stopOpacity="0" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_luxury_wave"
              x1="256.267"
              y1="76.6717"
              x2="-40.8688"
              y2="31.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F59E0B" stopOpacity="0" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}

export default LuxuryTestimonialsSection

"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { CheckCircle, Award, Building, Users, Target } from "lucide-react"

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

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

    const element = document.getElementById(`about-counter-${title}`)
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
    <div id={`about-counter-${title}`} className="text-center group">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
        <Icon className="w-8 h-8 text-gold-500 transition-colors duration-500" />
      </div>
      <div className="text-3xl md:text-4xl font-serif font-light bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-slate-600/80 font-sans text-sm uppercase tracking-widest font-medium">{title}</div>
    </div>
  )
}

// Luxury List Item Component
const LuxuryListItem = ({ text, icon: Icon = CheckCircle }) => (
  <div className="group flex items-center mb-6 p-4 rounded-xl hover:bg-stone-50/50 transition-all duration-300">
    <div className="mr-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 text-gold-500 group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
      <Icon className="h-6 w-6" />
    </div>
    <p className="text-lg font-light text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
      {text}
    </p>
  </div>
)

// Section header component for luxury styling
const LuxurySectionHeader = ({ eyebrow, title, description }) => {
  return (
    <div className="mb-16">

      <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-[0.3em] text-gold-600 uppercase rounded-full bg-gold-500/10">
        {eyebrow}
      </span>
      <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-serif font-light text-slate-800 tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-slate-600/80 text-xl leading-relaxed font-light max-w-2xl">{description}</p>
    </div>
  )
}

const LuxuryAboutSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="py-32 bg-stone-50 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gold-500/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-gold-500/5 blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="border-b border-slate-200/50 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Section */}
            <div
              className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              {/* Luxury Section Header */}
              <LuxurySectionHeader
                eyebrow="Our Excellence"
                title={
                  <>
                    Kenya Real Estate.
                    <span className="block bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent font-normal">
                      Kings Standard
                    </span>
                  </>
                }
                description="Kings Developers, a leading real estate agency in Kenya, meticulously manages every step from design and planning to the finishing touches, ensuring a complete reflection of your perfect property."
              />

              {/* Enhanced Feature List */}
              <div className="grid md:grid-cols-2 gap-4 mb-12">
                <div className="space-y-2">
                  <LuxuryListItem text="Design & Planning" icon={Target} />
                  <LuxuryListItem text="On-Time & On-Budget Delivery" icon={CheckCircle} />
                  <LuxuryListItem text="Vision Realization" icon={Award} />
                  <LuxuryListItem text="Quality Assurance" icon={CheckCircle} />
                </div>
                <div className="space-y-2">
                  <LuxuryListItem text="Architectural Expertise" icon={Building} />
                  <LuxuryListItem text="Exceeding Expectations" icon={Award} />
                  <LuxuryListItem text="Bespoke Properties" icon={Target} />
                  <LuxuryListItem text="Lasting Value & Quality" icon={CheckCircle} />
                </div>
              </div>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 items-center justify-center md:grid-cols-4 gap-6 mb-12">
                <LuxuryCounter target={21} title="Years" suffix="+" icon={Award} />
                <LuxuryCounter target={45} title="Projects" suffix="+" icon={Building} />
                <LuxuryCounter target={8000} title="Clients" suffix="+" icon={Users} />
               
              </div>

            </div>

            {/* Enhanced Image Section */}
            <div
              className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative aspect-[4/5] max-w-[500px] mx-auto lg:ml-auto lg:mr-0 rounded-3xl overflow-hidden shadow-2xl group">
                  <Image
                    loader={imageLoader}
                    src="/eden.jpg"
                    alt="Kings Developers Premium Property"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Overlay Content */}
                  <div className="absolute bottom-8 left-8 right-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <h4 className="text-white font-serif text-xl font-light mb-2">Premium Quality</h4>
                      <p className="text-white/80 font-light text-sm">Every detail crafted to perfection</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Card */}
                <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gold-500/10 hidden lg:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/30 flex items-center justify-center">
                      <Award className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-light text-slate-800">21+</p>
                      <p className="text-sm text-slate-600 font-light">Years Excellence</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/30 blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/10 to-gold-600/20 blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LuxuryAboutSection

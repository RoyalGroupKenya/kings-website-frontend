"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Play, Award, Building, Users } from "lucide-react"
import ModalVideo from "react-modal-video"

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

    const element = document.getElementById(`video-counter-${title}`)
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
    <div id={`video-counter-${title}`} className="text-center group">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/30 flex items-center justify-center group-hover:from-white/30 group-hover:to-white/40 transition-all duration-500 backdrop-blur-sm border border-white/20">
        <Icon className="w-8 h-8 text-white transition-colors duration-500" />
      </div>
      <div className="text-4xl md:text-5xl font-serif font-light bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-white/80 font-sans text-sm uppercase tracking-widest font-medium">{title}</div>
    </div>
  )
}

// Section header component for luxury styling
const LuxurySectionHeader = ({ eyebrow, title, description }) => {
  return (
    <div className="text-center mb-20">
      <div className="mx-auto w-1 h-12 bg-gold-500 mb-8"></div>
      <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase rounded-full bg-gold-500/10 backdrop-blur-sm">
        {eyebrow}
      </span>
      <h2 className="mb-6 text-5xl md:text-6xl font-serif font-light text-white tracking-tight">{title}</h2>
      <p className="max-w-3xl mx-auto text-white/80 text-xl leading-relaxed font-light">{description}</p>
    </div>
  )
}

const LuxuryVideoSection = () => {
  const [isOpen, setOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <Image
          loader={imageLoader}
          src="/prism.png"
          alt="Kings Developers Story"
          fill
          className="object-cover"
          unoptimized
        />
        {/* Sophisticated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold-900/20 via-transparent to-slate-900/40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gold-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-gold-500/10 blur-2xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Luxury Section Header */}
        <LuxurySectionHeader
          eyebrow="Our Story"
          title="Ready to Help You Succeed"
          description="Discover how Kings Developers has been transforming Kenya's real estate landscape for over two decades. Watch our story of excellence, innovation, and unwavering commitment to our clients."
        />

        {/* Video Player Section */}
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="max-w-5xl mx-auto mb-20">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl group">
              <Image
                loader={imageLoader}
                src="/prism.png"
                alt="Kings Developers Video Preview"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30 group-hover:from-slate-900/40 group-hover:to-slate-900/20 transition-all duration-500" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  aria-label="Play video about Kings Developers"
                  onClick={() => setOpen(true)}
                  className="group/btn relative flex h-24 w-24 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-slate-800 transition-all duration-500 hover:bg-white hover:scale-110 shadow-2xl hover:shadow-gold-500/25"
                >
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping animation-delay-75"></div>

                  {/* Play Icon */}
                  <Play
                    className="h-8 w-8 ml-1 transition-transform duration-300 group-hover/btn:scale-110"
                    fill="currentColor"
                  />
                </button>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute hidden sm:flex bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-serif text-2xl font-light mb-2">Our Journey of Excellence</h3>
                  <p className="text-white/80 font-light">
                    From humble beginnings to Kenya's premier real estate developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <LuxuryCounter target={21} title="Years Experience" suffix="+" icon={Award} />
          <LuxuryCounter target={45} title="Projects Completed" suffix="+" icon={Building} />
          <LuxuryCounter target={8000} title="Happy Clients" suffix="+" icon={Users} />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm p-12 rounded-3xl shadow-xl max-w-4xl mx-auto border border-white/20">
            <div className="inline-block w-1 h-8 bg-gold-500 mb-6"></div>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
              Ready to Begin Your
              <span className="block bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent font-normal">
                Property Journey?
              </span>
            </h3>
            <p className="text-white/80 text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have found their perfect property with Kings Developers. Let us
              help you grow with Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 px-10 py-5 text-base font-sans font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Start Your Search
              </button>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-5 text-base font-sans font-semibold rounded-full backdrop-blur-sm transition-all duration-300 bg-transparent">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Video */}
      <ModalVideo
        channel="youtube"
        autoplay={true}
        start={true}
        isOpen={isOpen}
        videoId="DhqS-EScAW4"
        onClose={() => setOpen(false)}
      />

      {/* Enhanced Background Pattern */}
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat opacity-10"></div>
    </section>
  )
}

export default LuxuryVideoSection

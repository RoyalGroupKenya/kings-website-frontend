"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const MinimalistLuxuryHero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Minimalist Background */}
      <div className="absolute inset-0">
        <Image
          loader={imageLoader}
          src="/hero.jpeg"
          alt="Kings Developers - Luxury Real Estate"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Subtle, Clean Overlay */}
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-200/60 via-transparent to-slate-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 via-transparent to-slate-900/20" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Elegant Brand Mark */}
          <div className="mb-12">
             <div className="inline-block  w-1 h-16  mb-8"></div>
            <div className="inline-block sm:hidden w-1 h-16 bg-gradient-to-b from-transparent via-gold-500 to-transparent mb-8"></div>
            <p className="text-primary font-sans text-transparent font-medium tracking-[0.4em] uppercase text-sm">Kings Developers</p>
          </div>

          {/* Clean, Powerful Headline */}
           <h1 className="font-serif text-7xl md:text-8xl lg:text-8xl font-light text-white leading-[0.85] mb-12 tracking-tight">
             Crafting  Timeless
              <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                 Excellence
              </span>
            </h1>
       

          {/* Concise, Impactful Tagline */}
          <p className="text-white/80 text-md md:text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto font-serif">
            Kenya's premier real estate developer, creating architectural masterpieces for over two decades
          </p>

          {/* Clean Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/projects">
              <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 px-12 py-6 text-lg font-sans font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Explore Properties
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>

            <Link href="https://www.youtube.com/watch?v=HCcU6OZzYu8">
              <Button
                variant="outline"
                className="border-2 border-white/50 text-white hover:bg-white hover:text-slate-900 px-12 py-6 text-lg font-sans font-semibold rounded-full backdrop-blur-sm transition-all duration-500 bg-transparent hover:shadow-xl"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 mr-3">
                  <Play className="h-4 w-4" />
                </div>
                Our Story
              </Button>
            </Link>
          </div>

          {/* Subtle Secondary Action */}
          <div className="text-center">
            <Link
              href="/contact"
              className="text-white/70 hover:text-gold-400 font-sans font-light text-base transition-colors duration-300 border-b border-white/20 hover:border-gold-400/50 pb-1"
            >
              Schedule a consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Simplified, Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
        </div>
      </div>

      {/* Subtle Floating Elements */}
      <div className="absolute top-1/3 z-50 right-20 w-2 h-2 rounded-full bg-gold-500/30 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-20 w-1 h-1 rounded-full bg-gold-500/20 animate-pulse delay-1000"></div>
    </section>
  )
}

export default MinimalistLuxuryHero

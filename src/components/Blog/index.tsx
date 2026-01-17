"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, TrendingUp, Users } from "lucide-react"
import SingleBlog from "../Blog/SingleBlog"

// Enhanced Counter with luxury styling and intersection observer
const LuxuryCounter = ({ target, title, suffix = "", duration = 2000 }) => {
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

    const element = document.getElementById(`blog-counter-${title}`)
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
    <div id={`blog-counter-${title}`} className="text-center">
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

const LuxuryBlogSection = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const displayBlogs = data && data.length > 0 ? data.slice(0, 3) : []

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gold-500/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-gold-500/5 blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Luxury Section Header */}
        <LuxurySectionHeader
          eyebrow="Insights & Knowledge"
          title="Latest Insights"
          description="Stay informed with expert insights on Kenya's real estate market. Discover investment opportunities, market trends, and valuable advice from our property specialists."
        />

        {/* Blog Stats */}
        <div className="grid grid-cols-3 gap-8 mb-20 max-w-2xl mx-auto">
          <LuxuryCounter target={150} title="Articles" suffix="+" />
          <LuxuryCounter target={25} title="Market Reports" suffix="+" />
          <LuxuryCounter target={10} title="Expert Guides" suffix="K+" />
        </div>

        {/* Blog Grid */}
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {displayBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {displayBlogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    className="w-full transform transition-all duration-500 hover:scale-105"
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    <SingleBlog blog={blog} />
                  </div>
                ))}
              </div>

              {/* View All Blogs CTA */}
              <div className="text-center">
                <Link href="/blogs">
                  <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 px-12 py-6 text-lg font-sans font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    Read All Articles
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            // Empty State
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-gold-500" />
              </div>
              <h3 className="font-serif text-3xl font-light text-slate-800 mb-4">New Content Coming Soon</h3>
              <p className="text-slate-600/70 text-lg font-light mb-8 max-w-md mx-auto">
                We're preparing valuable insights and market analysis for you. Stay tuned for expert content.
              </p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-gold-500/20 text-gold-600 hover:bg-gold-50 hover:border-gold-500/40 px-8 py-4 font-sans font-medium rounded-full transition-all duration-300 bg-transparent"
                >
                  Get Notified
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Featured Content Highlights */}
        <div className="mt-32">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
                <TrendingUp className="w-8 h-8 text-gold-500" />
              </div>
              <h4 className="font-serif text-2xl font-light text-slate-800 mb-4">Market Analysis</h4>
              <p className="text-slate-600/80 leading-relaxed font-light">
                In-depth analysis of Kenya's real estate trends, pricing patterns, and investment opportunities across
                major cities.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
                <BookOpen className="w-8 h-8 text-gold-500" />
              </div>
              <h4 className="font-serif text-2xl font-light text-slate-800 mb-4">Investment Guides</h4>
              <p className="text-slate-600/80 leading-relaxed font-light">
                Comprehensive guides for first-time buyers, diaspora investors, and seasoned property developers in
                Kenya.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
                <Users className="w-8 h-8 text-gold-500" />
              </div>
              <h4 className="font-serif text-2xl font-light text-slate-800 mb-4">Success Stories</h4>
              <p className="text-slate-600/80 leading-relaxed font-light">
                Real experiences from our clients who have successfully invested in Kenyan real estate and built lasting
                wealth.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default LuxuryBlogSection

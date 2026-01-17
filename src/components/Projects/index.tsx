"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building, Eye } from "lucide-react"
import SingleBlog from "../Blog/projectSingle"

// Enhanced Counter with luxury styling and intersection observer
const LuxuryCounter = ({ target, title, duration = 2000 }) => {
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

    const element = document.getElementById(`projects-counter-${title}`)
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
    <div id={`projects-counter-${title}`} className="text-center">
      <div className="text-4xl md:text-5xl font-serif font-light bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent mb-2">
        {count}+
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

const LuxuryProjectsSection = ({ data }) => {
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const showMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 6, data?.length || 0))
  }

  const hasMoreProjects = data && visibleProjects < data.length

  return (
    <section className="py-32 bg-stone-50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=2000')] bg-cover bg-center opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Luxury Section Header */}
        <LuxurySectionHeader
          eyebrow="Our Portfolio"
          title="Ongoing Projects"
          description="Discover our current developments where luxury meets innovation. Each project represents our commitment to excellence and attention to detail."
        />

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-8 mb-20 max-w-2xl mx-auto">
          <LuxuryCounter target={data?.length || 0} title="Active Projects" />
          <LuxuryCounter target={45} title="Completed" />
          <LuxuryCounter target={8000} title="Happy Clients" />
        </div>

        {/* Projects Grid */}
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {data && data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {data.slice(0, visibleProjects).map((blog, index) => (
                  <div
                    key={blog.id}
                    className="w-full transform transition-all duration-500 hover:scale-105"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <SingleBlog blog={blog} />
                  </div>
                ))}
              </div>

              {/* Load More / View All Section */}
              <div className="text-center">
                {hasMoreProjects ? (
                  <Button
                    onClick={showMoreProjects}
                    className="bg-white hover:bg-gold-50 text-slate-800 border-2 border-gold-500/20 hover:border-gold-500/40 px-12 py-6 text-lg font-sans font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Eye className="mr-3 w-5 h-5" />
                    Show More Projects
                  </Button>
                ) : (
                  <div className="space-y-6">
                   
                    <Link href="/projects">
                      <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 px-12 py-6 text-lg font-sans font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        View All Properties
                        <ArrowRight className="ml-3 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Empty State
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                <Building className="w-10 h-10 text-gold-500" />
              </div>
              <h3 className="font-serif text-3xl font-light text-slate-800 mb-4">New Projects Coming Soon</h3>
              <p className="text-slate-600/70 text-lg font-light mb-8 max-w-md mx-auto">
                We're constantly developing new luxury properties. Stay tuned for exciting announcements.
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

      </div>
    </section>
  )
}

export default LuxuryProjectsSection

"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SingleBlog from "@/components/Blog/newsSingle"
import {
  Search,
  Grid,
  List,
  ArrowRight,
  Calendar,
  SlidersHorizontal,
  Newspaper,
  TrendingUp,
  Users,
  Tag,
  Eye,
  Clock,
} from "lucide-react"
import { useState, useEffect } from "react"

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

    const element = document.getElementById(`news-counter-${title}`)
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
    <div id={`news-counter-${title}`} className="text-center group">
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

// Luxury Breadcrumb Component for News
const LuxuryNewsBreadcrumb = ({ description, newsCount }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0">
      <Image
        loader={imageLoader}
        src="/hero.jpeg"
        alt="Latest Real Estate News in Kenya"
        fill
        className="object-cover"
        priority
      />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/85 via-slate-200/60 to-slate-900/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-600/60 to-slate-900/40" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content Side */}
        <div>
          <div className="inline-block w-1 h-8 bg-gold-500 mb-6"></div>

          {/* Breadcrumb Navigation */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-white/70 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gold-400 font-medium">Latest News</span>
              </li>
            </ol>
          </nav>


          <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight mb-6 tracking-tight">
            Latest From Kings Developers
         
          </h1>

          <p className="text-white/80 text-md leading-relaxed mb-8 max-w-lg font-light">{description}</p>

          {/* News Stats */}
         
        </div>

     
      </div>
    </div>
  </section>
)

// News Category Card Component
const NewsCategoryCard = ({ icon: Icon, title, description, count, color = "gold" }) => (
  <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100/50">
    <div
      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-${color}-500/10 to-${color}-600/20 flex items-center justify-center group-hover:from-${color}-500/20 group-hover:to-${color}-600/30 transition-all duration-500`}
    >
      <Icon className={`w-8 h-8 text-${color}-500`} />
    </div>
    <h3 className="font-serif text-xl font-light text-slate-800 mb-3 text-center">{title}</h3>
    <p className="text-slate-600/80 text-center font-light leading-relaxed mb-4">{description}</p>
    <div className="text-center">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full bg-${color}-50 text-${color}-700 text-sm font-medium`}
      >
        {count} Stories
      </span>
    </div>
  </div>
)

export default function LuxuryNewsPage({ data }) {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "All",
    timeframe: "All",
    sortBy: "newest",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredNews =
    data?.filter((news) => {
      const matchesSearch =
        news.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.metad?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filters.category === "All" || news.category === filters.category

      return matchesSearch && matchesCategory
    }) || []

  const breakingNews = filteredNews.filter((news) => news.breaking || news.featured)

  // News categories for filtering
  const newsCategories = [
    {
      icon: TrendingUp,
      title: "Market Updates",
      description: "Latest trends and developments in Kenya's real estate market",
      count: data?.filter((news) => news.category === "Market Updates").length || 0,
      color: "blue",
    },
    {
      icon: Newspaper,
      title: "Policy Changes",
      description: "Government policies and regulations affecting real estate",
      count: data?.filter((news) => news.category === "Policy").length || 0,
      color: "green",
    },
    {
      icon: Users,
      title: "Industry News",
      description: "Updates from real estate companies and industry leaders",
      count: data?.filter((news) => news.category === "Industry").length || 0,
      color: "purple",
    },
  ]

  return (
    <div className="bg-stone-50 font-sans overflow-x-hidden">
      {/* Luxury Breadcrumb */}
      <LuxuryNewsBreadcrumb
        description="Stay informed on Kenya's booming property market with Kings Developers. Get the latest from kings developers today."
        newsCount={data?.length || 0}
      />


      {/* Main Content Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-600/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search breaking news, market updates, and policy changes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-600/60 focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-base font-light shadow-lg"
              />
            </div>
          </div>

          {/* Enhanced Header with Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-slate-800 mb-2 tracking-tight">
                Latest Updates
              </h2>
              <p className="text-slate-600/70 font-light">{filteredNews.length} breaking stories • Updated hourly</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Advanced Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-slate-200 text-slate-700 hover:bg-slate-50 font-sans font-medium px-6 py-3 rounded-full bg-transparent"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? "Hide Filters" : "More Filters"}
              </Button>


              {/* Sort Dropdown */}
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-sans font-medium"
              >
                <option value="newest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="trending">Trending</option>
                <option value="breaking">Breaking News</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl mb-12 border border-slate-100/50 shadow-lg">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light"
                  >
                    <option value="All">All Categories</option>
                    <option value="Market Updates">Market Updates</option>
                    <option value="Policy Changes">Policy Changes</option>
                    <option value="Investment Trends">Investment Trends</option>
                    <option value="Development News">Development News</option>
                    <option value="Industry News">Industry News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Timeframe
                  </label>
                  <select
                    value={filters.timeframe}
                    onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light"
                  >
                    <option value="All">All Time</option>
                    <option value="Today">Today</option>
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Source
                  </label>
                  <select className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light">
                    <option>All Sources</option>
                    <option>Kings Developers</option>
                    <option>Market Reports</option>
                    <option>Government Updates</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Priority
                  </label>
                  <select className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light">
                    <option>All Priority</option>
                    <option>Breaking News</option>
                    <option>High Priority</option>
                    <option>Regular Updates</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Breaking News */}
          {!showFilters && breakingNews.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h3 className="font-serif text-2xl font-light text-slate-800">Breaking News</h3>
                </div>
                <Button variant="ghost" className="text-gold-600 hover:text-gold-700 font-sans font-medium">
                  View All Breaking
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="-mx-4 flex flex-wrap justify-center">
                {breakingNews.slice(0, 3).map((news) => (
                  <div key={news.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <SingleBlog blog={news} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All News */}
          <div className="mb-8">
            <h3 className="font-serif text-2xl font-light text-slate-800 mb-8">All News</h3>

            {/* News Grid */}
            <div
              className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {filteredNews.length > 0 ? (
                <div className="-mx-4 flex flex-wrap justify-center">
                  {filteredNews.map((news, index) => (
                    <div
                      key={news.id}
                      className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 transform transition-all duration-500"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <SingleBlog blog={news} />
                    </div>
                  ))}
                </div>
              ) : (
                // Enhanced No Results State
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center">
                    <Newspaper className="w-10 h-10 text-gold-500" />
                  </div>
                  <h3 className="font-serif text-3xl font-light text-slate-800 mb-4">No News Found</h3>
                  <p className="text-slate-600/70 mb-8 font-light max-w-md mx-auto leading-relaxed">
                    Try adjusting your search criteria or filters to discover more breaking news and market updates.
                  </p>

                  {/* Suggested Topics */}
                  <div className="mb-8">
                    <h4 className="font-serif text-xl font-light text-slate-800 mb-4">Popular Topics</h4>
                    <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                      {[
                        "Market Updates",
                        "Policy Changes",
                        "Investment Trends",
                        "Development News",
                        "Industry News",
                      ].map((topic) => (
                        <button
                          key={topic}
                          onClick={() => setFilters({ ...filters, category: topic })}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gold-200 text-gold-700 hover:bg-gold-50 hover:border-gold-300 rounded-full text-sm font-medium transition-colors duration-300"
                        >
                          <Tag className="w-4 h-4" />
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setFilters({ category: "All", timeframe: "All", sortBy: "newest" })
                    }}
                    variant="outline"
                    className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-3 font-sans font-medium rounded-full bg-transparent"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

  

    </div>
  )
}

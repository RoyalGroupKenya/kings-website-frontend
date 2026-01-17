"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SingleBlog from "@/components/Blog/SingleBlog"
import {
  Search,
  Grid,
  List,
  ArrowRight,
  Calendar,
  SlidersHorizontal,
  BookOpen,
  TrendingUp,
  Users,
  Tag,
  Eye,
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

    const element = document.getElementById(`blogs-counter-${title}`)
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
    <div id={`blogs-counter-${title}`} className="text-center group">
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

// Luxury Breadcrumb Component for Blogs
const LuxuryBlogsBreadcrumb = ({ description, blogCount }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0">
      <Image
        loader={imageLoader}
        src="/off.jpeg"
        alt="Real Estate Investment Insights"
        fill
        className="object-cover"
        priority
      />
       <div className="absolute inset-0 bg-gradient-to-b from-slate-100/85 via-slate-300/60 to-slate-900/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-600/85 via-slate-900/60 to-slate-900/40" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content Side */}
        <div>

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
                <span className="text-gold-400 font-medium">Insights & Tips</span>
              </li>
            </ol>
          </nav>

          <p className="text-gold-400 font-sans font-medium tracking-[0.2em] uppercase text-sm mb-6">
            Expert Insights & Knowledge
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight mb-6 tracking-tight">
            Real Estate
            <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              Investment Insights
            </span>
          </h1>

          <p className="text-white/80 text-md leading-relaxed mb-8 max-w-lg font-light">{description}</p>

          {/* Blog Stats */}
          <div className="flex items-center space-x-8 text-white/70">
            <div>
              <span className="text-2xl font-serif font-light text-white">{blogCount}+</span>
              <p className="text-xs font-sans uppercase tracking-wider">Expert Articles</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <span className="text-2xl font-serif font-light text-white">Weekly</span>
              <p className="text-xs font-sans uppercase tracking-wider">Updates</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <span className="text-2xl font-serif font-light text-white">Expert</span>
              <p className="text-xs font-sans uppercase tracking-wider">Insights</p>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  </section>
)

// Blog Category Card Component
const BlogCategoryCard = ({ icon: Icon, title, description, count, color = "gold" }) => (
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
        {count} Articles
      </span>
    </div>
  </div>
)

export default function LuxuryBlogsPage({ data }) {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "All",
    readTime: "All",
    sortBy: "newest",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredBlogs =
    data?.filter((blog) => {
      const matchesSearch =
        blog.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.metad?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filters.category === "All" || blog.category === filters.category

      return matchesSearch && matchesCategory
    }) || []

  const featuredBlogs = filteredBlogs.filter((blog) => blog.featured)

  // Blog categories for filtering
  const blogCategories = [
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "In-depth analysis of Kenya's real estate trends and market insights",
      count: data?.filter((blog) => blog.category === "Market Analysis").length || 0,
      color: "blue",
    },
    {
      icon: BookOpen,
      title: "Investment Guides",
      description: "Comprehensive guides for property investment and wealth building",
      count: data?.filter((blog) => blog.category === "Investment").length || 0,
      color: "green",
    },
    {
      icon: Users,
      title: "Success Stories",
      description: "Real experiences from successful property investors in Kenya",
      count: data?.filter((blog) => blog.category === "Success Stories").length || 0,
      color: "purple",
    },
  ]

  return (
    <div className="bg-stone-50 font-sans overflow-x-hidden">
      {/* Luxury Breadcrumb */}
      <LuxuryBlogsBreadcrumb
        description="Master the intricacies of Kenya's real estate market with expert insights from Kings Developers. Start your journey today."
        blogCount={data?.length || 0}
      />

      {/* Blog Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block w-1 h-12 bg-gold-500 mb-8"></div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-slate-800 mb-6 tracking-tight">
              Knowledge
              <span className="block bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent font-normal">
                Hub
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <LuxuryCounter target={data?.length || 0} title="Expert Articles" suffix="+" icon={BookOpen} />
            <LuxuryCounter target={25} title="Market Reports" suffix="+" icon={TrendingUp} />
            <LuxuryCounter target={10} title="Investment Guides" suffix="K+" icon={Users} />
            <LuxuryCounter target={98} title="Reader Satisfaction" suffix="%" icon={Eye} />
          </div>

          {/* Blog Categories */}
          <div className="grid md:grid-cols-3 gap-8">
            {blogCategories.map((category, index) => (
              <BlogCategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-600/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search investment insights, market analysis, and expert tips..."
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
                Latest Insights
              </h2>
              <p className="text-slate-600/70 font-light">{filteredBlogs.length} expert articles • Updated weekly</p>
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
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
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
                    <option value="Investment">Investment Tips</option>
                    <option value="Market Analysis">Market Analysis</option>
                    <option value="Property Guides">Property Guides</option>
                    <option value="Success Stories">Success Stories</option>
                    <option value="Diaspora">Diaspora Investing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Reading Time
                  </label>
                  <select
                    value={filters.readTime}
                    onChange={(e) => setFilters({ ...filters, readTime: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light"
                  >
                    <option value="All">Any Length</option>
                    <option value="Quick">Quick Read (2-5 min)</option>
                    <option value="Medium">Medium Read (5-10 min)</option>
                    <option value="Long">In-depth (10+ min)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Author
                  </label>
                  <select className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light">
                    <option>All Authors</option>
                    <option>Kings Developers Team</option>
                    <option>Market Analysts</option>
                    <option>Investment Experts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Date Range
                  </label>
                  <select className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light">
                    <option>All Time</option>
                    <option>Last Week</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Featured Articles */}
          {!showFilters && featuredBlogs.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-light text-slate-800">Featured Articles</h3>
                <Button variant="ghost" className="text-gold-600 hover:text-gold-700 font-sans font-medium">
                  View All Featured
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="-mx-4 flex flex-wrap justify-center">
                {featuredBlogs.slice(0, 3).map((blog) => (
                  <div key={blog.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <SingleBlog blog={blog} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div className="mb-8">
            <h3 className="font-serif text-2xl font-light text-slate-800 mb-8">All Articles</h3>

            {/* Articles Grid */}
            <div
              className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {filteredBlogs.length > 0 ? (
                <div className="-mx-4 flex flex-wrap justify-center">
                  {filteredBlogs.map((blog, index) => (
                    <div
                      key={blog.id}
                      className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 transform transition-all duration-500"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <SingleBlog blog={blog} />
                    </div>
                  ))}
                </div>
              ) : (
                // Enhanced No Results State
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-gold-500" />
                  </div>
                  <h3 className="font-serif text-3xl font-light text-slate-800 mb-4">No Articles Found</h3>
                  <p className="text-slate-600/70 mb-8 font-light max-w-md mx-auto leading-relaxed">
                    Try adjusting your search criteria or filters to discover more expert insights and investment tips.
                  </p>

                  {/* Suggested Topics */}
                  <div className="mb-8">
                    <h4 className="font-serif text-xl font-light text-slate-800 mb-4">Popular Topics</h4>
                    <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                      {[
                        "Investment Tips",
                        "Market Analysis",
                        "Property Guides",
                        "Diaspora Investing",
                        "Success Stories",
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
                      setFilters({ category: "All", readTime: "All", sortBy: "newest" })
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

      {/* Newsletter Subscription Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-stone-50 to-gold-50/30 p-12 rounded-3xl shadow-xl max-w-4xl mx-auto border border-gold-500/10">
            <div className="text-center">
              <div className="inline-block w-1 h-8 bg-gold-500 mb-6"></div>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-slate-800 mb-6 tracking-tight">
                Stay Ahead of the
                <span className="block bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent font-normal">
                  Market
                </span>
              </h3>
              <p className="text-slate-600/80 text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                Get exclusive market insights, investment opportunities, and expert advice delivered directly to your
                inbox. Join thousands of successful investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full border border-slate-200 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light bg-white"
                />
                <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 px-8 py-4 text-base font-sans font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-slate-500 text-sm font-light">
                No spam, unsubscribe anytime. Your privacy is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=2000')] bg-cover bg-center opacity-5" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block w-1 h-8 bg-gold-500 mb-6"></div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
                Ready to Start
                <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                  Investing?
                </span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed font-light mb-8">
                Turn your knowledge into action. Our property experts are ready to help you make your first investment
                or expand your portfolio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="flex-1">
                <Button className="w-full bg-gold-500 hover:bg-gold-600 text-slate-900 px-8 py-4 font-sans font-medium rounded-full shadow-lg transition-all duration-300">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 font-sans font-medium rounded-full backdrop-blur-sm bg-transparent"
                >
                  <Eye className="mr-2 w-5 h-5" />
                  View Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

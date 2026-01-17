"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SingleBlog from "@/components/Blog/projectSingle"
import { Search, Grid, List, ArrowRight, Home, Calendar, Phone, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// Luxury Breadcrumb Component
const LuxuryBreadcrumb = ({ pageName, description }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0">
      <Image loader={imageLoader} src="/l2.jpg" alt="Our Projects" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/45 via-slate-400/60 to-slate-900/40" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content Side */}
        <div>
          <div className="inline-block w-1 h-8 bg-gold-500 mb-6"></div>
          <p className="text-gold-400 font-sans font-medium tracking-[0.2em] uppercase text-sm mb-6">Our Portfolio</p>

          <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight mb-6 tracking-tight">
            {pageName.includes("Projects") ? (
              <>
                Luxury
                <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                  Properties
                </span>
              </>
            ) : (
              pageName
            )}
          </h1>

          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg font-light">{description}</p>

          {/* Quick Stats */}
          <div className="flex items-center space-x-8 text-white/70">
            <div>
              <span className="text-2xl font-serif font-light text-white">45+</span>
              <p className="text-xs font-sans uppercase tracking-wider">Properties</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <span className="text-2xl font-serif font-light text-white">21</span>
              <p className="text-xs font-sans uppercase tracking-wider">Years</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <span className="text-2xl font-serif font-light text-white">8K+</span>
              <p className="text-xs font-sans uppercase tracking-wider">Clients</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
)

export default function LuxuryProjectsPage({ projects = [] }) {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "All",
    location: "All",
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.status === "All" || project.status === filters.status
    const matchesLocation = filters.location === "All" || project.location?.includes(filters.location)

    return matchesSearch && matchesStatus && matchesLocation
  })

  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <div className="bg-stone-50 font-sans overflow-x-hidden">
      {/* Luxury Breadcrumb */}
      <LuxuryBreadcrumb
        pageName="Projects By Kings Developers Ltd, Kenya"
        description="Are you ready to find your Kenya property? Browse through our project portfolio for your perfect fit."
      />

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-600/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-600/60 focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-base font-light shadow-lg"
              />
            </div>
          </div>

          {/* Luxury Filter Navigation */}
          <div className="text-start py-6 mb-8">
            <ul className="flex-wrap flex flex-row items-start gap-4">
              <li className="text-base flex items-center font-medium text-gold-600">
                Filter By
                <span className="mx-2 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-slate-400"></span>
              </li>
              <li className="flex items-center">
                <Link
                  href="/projects/Under-Construction"
                  className="pr-1 text-base font-medium text-slate-600 hover:text-gold-600 transition-colors duration-300 font-light"
                >
                  Ongoing Projects
                </Link>
                <span className="mx-2 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-slate-400"></span>
              </li>
              <li className="flex items-center">
                <Link
                  href="/projects/Completed"
                  className="pr-1 text-base font-medium text-slate-600 hover:text-gold-600 transition-colors duration-300 font-light"
                >
                  Completed Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Header with Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-slate-800 mb-2 tracking-tight">
                Browse Properties
              </h2>
              <p className="text-slate-600/70 font-light">
                {filteredProjects.length} properties available • Updated daily
              </p>
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
              <select className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-sans font-medium">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-stone-50/80 backdrop-blur-sm p-8 rounded-3xl mb-12 border border-slate-100/50">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light"
                  >
                    <option value="All">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Under-Construction">Under Construction</option>
                    <option value="Pre-launch">Pre-launch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light"
                  >
                    <option value="All">All Locations</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kiambu">Kiambu</option>
                    <option value="Machakos">Machakos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Price Range
                  </label>
                  <select className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light">
                    <option>Any Price</option>
                    <option>Under KSh 10M</option>
                    <option>KSh 10M - 20M</option>
                    <option>Above KSh 20M</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Featured Properties */}
          {!showFilters && featuredProjects.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-light text-slate-800">Featured Properties</h3>
                <Button variant="ghost" className="text-gold-600 hover:text-gold-700 font-sans font-medium">
                  View All Featured
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="-mx-4 flex flex-wrap justify-center">
                {featuredProjects.slice(0, 3).map((project) => (
                  <div key={project.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <SingleBlog blog={project} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Properties with Original Layout */}
          <div className="mb-8">
            <h3 className="font-serif text-2xl font-light text-slate-800 mb-8">All Properties</h3>

            {/* Original Grid Layout */}
            <div className="-mx-4 flex flex-wrap justify-center">
              {filteredProjects.length !== 0 &&
                filteredProjects.map((project) => (
                  <div key={project.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <SingleBlog blog={project} />
                  </div>
                ))}
            </div>
          </div>

          {/* No Results State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-100/50 flex items-center justify-center">
                <Home className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-serif text-2xl font-light text-slate-800 mb-4">No Properties Found</h3>
              <p className="text-slate-600/70 mb-8 font-light max-w-md mx-auto">
                Try adjusting your search criteria or filters to discover more properties.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setFilters({ status: "All", location: "All" })
                }}
                variant="outline"
                className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-3 font-sans font-medium rounded-full bg-transparent"
              >
                Clear All Filters
              </Button>
            </div>
          )}
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
                Need Expert
                <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                  Guidance?
                </span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed font-light mb-8">
                Our property consultants are ready to help you find the perfect investment opportunity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="flex-1">
                <Button className="w-full bg-gold-500 hover:bg-gold-600 text-slate-900 px-8 py-4 font-sans font-medium rounded-full shadow-lg transition-all duration-300">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="tel:+254700000000">
                <Button
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 font-sans font-medium rounded-full backdrop-blur-sm bg-transparent"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

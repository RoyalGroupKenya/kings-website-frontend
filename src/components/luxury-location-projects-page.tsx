"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SingleBlog from "@/components/Blog/projectSingle"
import {
  Search,
  Grid,
  List,
  ArrowRight,
  Calendar,
  Phone,
  SlidersHorizontal,
  MapPin,
  Building,
  Filter,
  Home,
} from "lucide-react"
import { useState } from "react"

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// Enhanced location data with additional information
const uniqueLocations = [
  { location: "Kilimani, Nairobi", region: "Nairobi", type: "Urban" },
  { location: "Milimani, Nakuru", region: "Nakuru", type: "Urban" },
  { location: "Bondeni Area, Nakuru", region: "Nakuru", type: "Residential" },
  { location: "Syokimau", region: "Machakos", type: "Suburban" },
  { location: "Westlands, Nairobi", region: "Nairobi", type: "Commercial" },
  { location: "Hurlingham, Nairobi", region: "Nairobi", type: "Upmarket" },
  { location: "Upper Hill, Nairobi", region: "Nairobi", type: "Business" },
  { location: "Ngong Road", region: "Nairobi", type: "Mixed" },
  { location: "Mombasa", region: "Coast", type: "Coastal" },
  { location: "Lavington, Nairobi", region: "Nairobi", type: "Luxury" },
  { location: "Eldoret", region: "Uasin Gishu", type: "Urban" },
  { location: "Ruiru", region: "Kiambu", type: "Suburban" },
  { location: "Embakasi, Nairobi", region: "Nairobi", type: "Industrial" },
  { location: "Thika Town", region: "Kiambu", type: "Urban" },
  { location: "Rongai", region: "Kajiado", type: "Suburban" },
  { location: "Kileleshwa", region: "Nairobi", type: "Residential" },
  { location: "Karen, Nairobi", region: "Nairobi", type: "Luxury" },
  { location: "Mlolongo, Nairobi", region: "Machakos", type: "Industrial" },
  { location: "Mombasa Road, Nairobi", region: "Nairobi", type: "Commercial" },
]

// Luxury Breadcrumb Component for Location Pages
const LuxuryLocationBreadcrumb = ({ locationName, description, projectCount }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0">
      <Image
        loader={imageLoader}
        src="/nai.jpg"
        alt={`Properties in ${locationName}`}
        fill
        className="object-cover"
        priority
      />
      
 <div className="absolute inset-0 bg-gradient-to-r from-slate-800/85 via-slate-400/60 to-slate-900/40" />
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
                <Link href="/projects" className="hover:text-gold-400 transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gold-400 font-medium">Locations</span>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gold-400 font-medium">{locationName}</span>
              </li>
            </ol>
          </nav>

          <p className="text-gold-400 font-sans font-medium tracking-[0.2em] uppercase text-sm mb-6">
            Properties in {locationName}
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight mb-6 tracking-tight">
            Discover
            <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              {locationName}
            </span>
          </h1>

          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg font-light">{description}</p>

          {/* Location Stats */}
          <div className="flex items-center space-x-8 text-white/70">
            <div>
              <span className="text-2xl font-serif font-light text-white">{projectCount}+</span>
              <p className="text-xs font-sans uppercase tracking-wider">Properties</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <span className="text-2xl font-serif font-light text-white">Premium</span>
              <p className="text-xs font-sans uppercase tracking-wider">Location</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <span className="text-2xl font-serif font-light text-white">Kenya</span>
              <p className="text-xs font-sans uppercase tracking-wider">Prime Area</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
)

export default function LuxuryLocationProjectsPage({ projectsData, locationName, displayLocationName }) {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "All",
    type: "All",
    priceRange: "All",
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredProjects =
    projectsData?.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filters.status === "All" || project.status === filters.status
      const matchesType = filters.type === "All" || project.type === filters.type

      return matchesSearch && matchesStatus && matchesType
    }) || []

  const featuredProjects = filteredProjects.filter((project) => project.featured)

  // Get location info from our enhanced data
  const locationInfo = uniqueLocations.find((loc) => loc.location.toLowerCase() === displayLocationName.toLowerCase())

  return (
    <div className="bg-stone-50 font-sans overflow-x-hidden">
      {/* Luxury Breadcrumb */}
      <LuxuryLocationBreadcrumb
        locationName={displayLocationName}
        description={`Explore our premium property developments in ${displayLocationName}. Each project represents our commitment to excellence and innovation in this prime location.`}
        projectCount={projectsData?.length || 0}
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
                placeholder={`Search properties in ${displayLocationName}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-600/60 focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-base font-light shadow-lg"
              />
            </div>
          </div>

          {/* Location Info Card */}
          {locationInfo && (
            <div className="bg-gradient-to-r from-gold-50 to-gold-100/50 p-8 rounded-3xl mb-12 border border-gold-200/50">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/30 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className="font-serif text-xl font-light text-slate-800 mb-2">Prime Location</h3>
                  <p className="text-slate-600/80 font-light">{locationInfo.region} Region</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/30 flex items-center justify-center">
                    <Building className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className="font-serif text-xl font-light text-slate-800 mb-2">Area Type</h3>
                  <p className="text-slate-600/80 font-light">{locationInfo.type} Development</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/30 flex items-center justify-center">
                    <Home className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className="font-serif text-xl font-light text-slate-800 mb-2">Available Properties</h3>
                  <p className="text-slate-600/80 font-light">{projectsData?.length || 0} Projects</p>
                </div>
              </div>
            </div>
          )}

          {/* Luxury Filter Navigation */}
          <div className="text-start py-6 mb-8 border-b border-slate-200/50">
            <ul className="flex-wrap flex flex-row items-start gap-4">
              <li className="text-base flex items-center font-medium text-gold-600">
                <Filter className="w-4 h-4 mr-2" />
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
                Properties in {displayLocationName}
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
              <div className="grid md:grid-cols-4 gap-6">
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
                    Property Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light"
                  >
                    <option value="All">All Types</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Mixed">Mixed Use</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light"
                  >
                    <option value="All">Any Price</option>
                    <option value="Under 10M">Under KSh 10M</option>
                    <option value="10M-20M">KSh 10M - 20M</option>
                    <option value="Above 20M">Above KSh 20M</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-3 tracking-wider uppercase">
                    Other Locations
                  </label>
                  <select className="w-full p-3 rounded-xl border border-slate-200/50 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50 font-light">
                    <option>Current Location</option>
                    {uniqueLocations
                      .filter((loc) => loc.location !== displayLocationName)
                      .slice(0, 5)
                      .map((loc) => (
                        <option key={loc.location} value={loc.location}>
                          {loc.location}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Featured Properties */}
          {!showFilters && featuredProjects.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-light text-slate-800">
                  Featured Properties in {displayLocationName}
                </h3>
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

          {/* All Properties */}
          <div className="mb-8">
            <h3 className="font-serif text-2xl font-light text-slate-800 mb-8">
              All Properties in {displayLocationName}
            </h3>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="-mx-4 flex flex-wrap justify-center">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <SingleBlog blog={project} />
                  </div>
                ))}
              </div>
            ) : (
              // Enhanced No Results State
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-gold-500" />
                </div>
                <h3 className="font-serif text-3xl font-light text-slate-800 mb-4">
                  No Properties Found in {displayLocationName}
                </h3>
                <p className="text-slate-600/70 mb-8 font-light max-w-md mx-auto leading-relaxed">
                  We currently don't have projects listed specifically for {displayLocationName}. You might be
                  interested in our projects in other prime locations.
                </p>

                {/* Suggested Locations */}
                <div className="mb-8">
                  <h4 className="font-serif text-xl font-light text-slate-800 mb-4">Explore Other Prime Locations</h4>
                  <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                    {uniqueLocations.slice(0, 6).map((loc) => (
                      <Link
                        key={loc.location}
                        href={`/location/${loc.location
                          .toLowerCase()
                          .replace(/[^a-z0-9\s,-]/g, "")
                          .replace(/[\s,]+/g, "-")}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gold-200 text-gold-700 hover:bg-gold-50 hover:border-gold-300 rounded-full text-sm font-medium transition-colors duration-300"
                      >
                        <MapPin className="w-4 h-4" />
                        {loc.location}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/projects/Under-Construction">
                    <Button className="bg-gold-500 hover:bg-gold-600 text-slate-900 px-8 py-4 font-sans font-medium rounded-full shadow-lg transition-all duration-300">
                      View Ongoing Projects
                    </Button>
                  </Link>
                  <Link href="/projects/Completed">
                    <Button
                      variant="outline"
                      className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-4 font-sans font-medium rounded-full bg-transparent"
                    >
                      View Completed Projects
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explore Other Locations Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block w-1 h-12 bg-gold-500 mb-8"></div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-slate-800 mb-6 tracking-tight">
              Explore Other
              <span className="block bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent font-normal">
                Prime Locations
              </span>
            </h2>
            <p className="text-slate-600/70 text-xl leading-relaxed font-light max-w-3xl mx-auto">
              Discover premium properties across Kenya's most sought-after locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueLocations.slice(0, 9).map((location) => (
              <Link
                key={location.location}
                href={`/location/${location.location
                  .toLowerCase()
                  .replace(/[^a-z0-9\s,-]/g, "")
                  .replace(/[\s,]+/g, "-")}`}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100/50"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-light text-slate-800 group-hover:text-gold-600 transition-colors duration-300">
                      {location.location}
                    </h3>
                    <p className="text-slate-500 text-sm font-light">
                      {location.region} • {location.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm font-light">View Properties</span>
                  <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
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
                Need Location
                <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                  Guidance?
                </span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed font-light mb-8">
                Our location specialists can help you find the perfect area that matches your lifestyle and investment
                goals.
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

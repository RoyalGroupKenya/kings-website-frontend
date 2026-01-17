"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "../ui/badge" 
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowRight,
  Star,
  Heart,
  Share2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Calculator,
} from "lucide-react"
import { useState } from "react"
import moment from "moment"

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const SingleBlog = ({ blog }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (blog?.images && blog.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % blog.images.length)
    }
  }

  const prevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (blog?.images && blog.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + blog.images.length) % blog.images.length)
    }
  }

  const toggleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const cleanPrice = blog?.price ? blog.price.replace(/[^0-9]/g, "") : ""
  const calculatorHref = cleanPrice
    ? `/investment-calculator?price=${cleanPrice}`
    : "/investment-calculator"

  // Determine status badge variant
  const getStatusVariant = (type) => {
    if (type?.toLowerCase().includes("ready") || type?.toLowerCase().includes("completed")) {
      return "default"
    }
    return "secondary"
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 bg-white">
      {/* Enhanced Image Section */}
      <div
        className="relative h-80 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/project/${blog?.name.replace(/,?\s+/g, "-").toLowerCase()}_${blog?.id}`}>
          <Image
            loader={imageLoader}
            src={`https://kingsdevelopersapi.co.ke${blog?.images?.[currentImageIndex]}` || blog?.images?.[0] || "/placeholder.svg"}
            alt={blog?.name || "Property"}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent" />

        {/* Image Navigation for Multiple Images */}
        {blog?.images && blog.images.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4 text-navy-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4 text-navy-800" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {blog?.images && blog.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {blog.images.slice(0,4).map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-white scale-125" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Status and Featured Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge
            variant={getStatusVariant(blog?.type)}
            className="bg-white/95 backdrop-blur-sm text-navy-800 hover:bg-white font-montserrat font-medium text-xs shadow-lg"
          >
            {blog?.status || "Property"}
          </Badge>
          {blog?.featured && (
            <div className="w-7 h-7 rounded-full bg-gold-500/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Star className="w-4 h-4 text-white fill-current" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={toggleLike}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-navy-700"}`} />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg">
            <Share2 className="w-4 h-4 text-navy-700" />
          </button>
        </div>

      

        {/* Location Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center text-sm opacity-90">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="font-montserrat font-medium">{blog?.location}</span>
          </div>
        </div>
      </div>

      {/* Compact Content Section */}
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-playfair text-xl font-light text-navy-800 line-clamp-1">
            <Link
              href={`/project/${blog?.name.replace(/,?\s+/g, "-").toLowerCase()}_${blog?.id}`}
              className="hover:text-gold-600 transition-colors duration-300"
            >
              {blog?.name}
            </Link>
          </h3>
          <span className="text-gold-600 font-montserrat font-semibold whitespace-nowrap ml-2">
            {blog?.status !== "Completed" && blog?.price}
          </span>
        </div>

        <Link
          href={`/location/${blog?.location
            ?.replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase()
            .replace(/^-+|-+$/g, "")}`}
          className="block mb-4"
        >
          <div className="flex items-center text-sm text-navy-600/70 hover:text-gold-600 transition-colors duration-300">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="font-light">{blog?.location}</span>
          </div>
        </Link>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-5 text-sm text-navy-600/70">
          <div className="flex items-center gap-4">
            {blog?.bedrooms && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span className="font-light">{blog.bedrooms}</span>
              </div>
            )}
            {blog?.bathrooms && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span className="font-light">{blog.bathrooms}</span>
              </div>
            )}
            {blog?.size && (
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span className="font-light">{blog.size}</span>
              </div>
            )}
          </div>
        </div>

        {/* Developer Info */}
        <div className="flex items-center justify-between mb-5 text-xs text-navy-600/70 border-t border-navy-100 pt-4">
          <div>
            <p className="font-montserrat font-medium text-navy-800">Kings Developers</p>
            <p className="font-light">{blog?.type}</p>
          </div>
          {blog?.created_at && (
            <div className="text-right">
              <p className="font-montserrat font-medium text-navy-800">Listed</p>
              <p className="font-light">{moment(blog.created_at).fromNow()}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Link href={`/project/${blog?.name.replace(/,?\s+/g, "-").toLowerCase()}_${blog?.id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-navy-200 text-navy-700 hover:bg-navy-50 font-montserrat font-medium rounded-full bg-transparent"
              >
                View Details
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900 rounded-full px-6 font-montserrat font-medium">
              Contact
            </Button>
          </div>
          
          {/* Payment Plan Calculator Button */}
          {blog.status !== "Completed" && <Link href={calculatorHref} className="w-full">
            <Button 
              variant="outline"
              className="w-full border-gold-200 text-gold-700 hover:bg-gold-50 hover:border-gold-300 font-montserrat font-medium rounded-full bg-transparent transition-all duration-300"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Plan Your Payments
            </Button>
          </Link>}
        </div>
      </CardContent>
    </Card>
  )
}

export default SingleBlog

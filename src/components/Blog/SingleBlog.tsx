"use client"

import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const SingleBlog = ({ blog }) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100/50">
      {/* Image Section with Enhanced Overlay */}
      <Link
        href={`/blog-page/${blog?.name?.replace(/,?\s+/g, "-").toLowerCase()}_${blog?.id}`}
        className="relative block aspect-[4/3] w-full overflow-hidden"
      >
        {blog.images && (
          <Image
            loader={imageLoader}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            src={`https://kingsdevelopersapi.co.ke${blog?.images[0]}`}
            alt={blog?.name || "Blog image"}
            fill
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2 text-sm font-semibold capitalize text-slate-900 shadow-lg backdrop-blur-sm">
          {blog?.category}
        </span>

        {/* Reading Time Badge */}
        <div className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-2 text-xs font-medium text-slate-700 shadow-lg">
          <Clock className="w-3 h-3" />
          <span>5 min read</span>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
          <ArrowRight className="h-5 w-5" />
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-8">
        {/* Title */}
        <h3 className="mb-4">
          <Link
            href={`/blog-page/${blog?.name?.replace(/,?\s+/g, "-").toLowerCase()}_${blog?.id}`}
            className="block text-xl font-serif font-light text-slate-800 hover:text-gold-600 transition-colors duration-300 leading-tight line-clamp-2 group-hover:text-gold-600"
          >
            {blog?.name}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mb-6 text-slate-600/80 font-light text-sm leading-relaxed line-clamp-3 border-b border-slate-100 pb-6">
          {blog?.metad?.slice(0, 120)}...
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/10 to-gold-600/20 text-gold-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-800 font-sans">{blog?.author || "Kings Developers"}</h4>
              <p className="text-xs text-slate-500 font-light">Real Estate Expert</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar className="h-4 w-4" />
            <div className="text-right">
              <p className="text-xs font-medium text-slate-600">{moment(blog?.created_at).format("MMM DD")}</p>
              <p className="text-xs text-slate-500 font-light">{moment(blog?.created_at).format("YYYY")}</p>
            </div>
          </div>
        </div>

        {/* Read More Link */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            href={`/blog-page/${blog?.name?.replace(/,?\s+/g, "-").toLowerCase()}_${blog?.id}`}
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium text-sm transition-colors duration-300 group/link"
          >
            <span>Read Full Article</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Subtle Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </article>
  )
}

export default SingleBlog

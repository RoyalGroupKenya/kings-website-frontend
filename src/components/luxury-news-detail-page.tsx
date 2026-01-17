"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SharePost from "@/components/Blog/SharePost"
import TagButton from "@/components/Blog/TagButton"
import NewsLatterBox from "@/components/Contact/NewsLatterBox"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  Bookmark,
  User,
  Tag,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  ChevronRight,
  AlertCircle,
  Building,
  Phone,
  Mail,
  Newspaper,
  Zap,
} from "lucide-react"
import { useState, useEffect } from "react"
import moment from "moment"

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// Enhanced Progress Bar Component
const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener("scroll", updateProgress)
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-200/50 z-50 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Breaking News Alert Component
const BreakingNewsAlert = ({ isBreaking }) => {
  if (!isBreaking) return null

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-2xl mb-8 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <Zap className="w-5 h-5" />
          <span className="font-bold text-sm uppercase tracking-wider">Breaking News</span>
        </div>
        <div className="text-sm font-medium">
          This story is developing and will be updated as more information becomes available.
        </div>
      </div>
    </div>
  )
}

// Enhanced Author Card Component
const LuxuryAuthorCard = ({ author, publishedDate, category, readingTime = "5 min read" }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100/50 mb-8">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/30 flex items-center justify-center">
          <User className="w-8 h-8 text-gold-600" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-light text-slate-800 mb-1">By {author}</h3>
          <p className="text-slate-600/70 text-sm font-medium">Senior Real Estate Correspondent</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{moment(publishedDate).format("MMM DD, YYYY")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              category === "Breaking News"
                ? "bg-red-100 text-red-700"
                : category === "Market Update"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gold-100 text-gold-700"
            }`}
          >
            <Tag className="w-3 h-3 mr-1" />
            {category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full px-4 bg-transparent"
          >
            <Bookmark className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full px-4 bg-transparent"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </div>
  </div>
)

// Table of Contents Component
const TableOfContents = ({ content }) => {
  const [activeSection, setActiveSection] = useState("")
  const [isSticky, setIsSticky] = useState(false)

  // Extract headings from HTML content
  const extractHeadings = (htmlContent) => {
    if (typeof window === "undefined") return []

    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = htmlContent
    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4")

    return Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent,
      level: Number.parseInt(heading.tagName.charAt(1)),
    }))
  }

  const headings = extractHeadings(content)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (headings.length === 0) return null

  return (
    <div className={`transition-all duration-300 ${isSticky ? "sticky top-8" : ""}`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-slate-100/50 mb-8">
        <h3 className="font-serif text-lg font-light text-slate-800 mb-4 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-gold-500" />
          Article Outline
        </h3>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm transition-colors duration-200 hover:text-gold-600 ${
                heading.level === 1
                  ? "font-medium text-slate-800"
                  : heading.level === 2
                    ? "ml-4 text-slate-700"
                    : "ml-8 text-slate-600"
              } ${activeSection === heading.id ? "text-gold-600 font-medium" : ""}`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

// Enhanced Related News Component
const RelatedNewsCard = ({ title, image, slug, date, category, isBreaking = false }) => (
  <Link href={slug} className="group block">
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100/50">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          loader={imageLoader}
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {isBreaking && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
              BREAKING
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-serif text-base font-light text-slate-800 mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors duration-300">
          {title}
        </h4>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {date}
          </span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  </Link>
)

// News Engagement Component
const NewsEngagement = ({ newsUrl, title }) => (
  <div className="bg-gradient-to-br from-slate-50 to-gold-50/30 rounded-3xl p-8 shadow-xl border border-gold-500/10 mb-8">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <h3 className="font-serif text-xl font-light text-slate-800 mb-2">Found this news helpful?</h3>
        <p className="text-slate-600/80 text-sm font-light">Share your thoughts and help others stay informed</p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full px-4 bg-transparent"
        >
          <ThumbsUp className="w-4 h-4 mr-1" />
          Helpful
        </Button>
      <Link href="/diaspora-forum">
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full px-4 bg-transparent"
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          Discuss
        </Button>
      </Link>
        <SharePost text={newsUrl} />
      </div>
    </div>
  </div>
)

export default function LuxuryNewsDetailPage({ data, relatedNews }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showTableOfContents, setShowTableOfContents] = useState(false)

  const isBreakingNews = data?.category === "Breaking News" || data?.priority === "high"
  const newsUrl = `/news-page/${data?.name?.replace(/,?\s+/g, "-").toLowerCase()}_${data?.id}`

  useEffect(() => {
    // Check if content is long enough for table of contents
    if (data?.description && data.description.length > 2000) {
      setShowTableOfContents(true)
    }
  }, [data])

  if (!data) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-light text-slate-800 mb-2">News Story Not Found</h2>
          <p className="text-slate-600 mb-6">The news story you're looking for doesn't exist or has been removed.</p>
          <Link href="/news">
            <Button className="bg-gold-500 hover:bg-gold-600 text-slate-900 px-6 py-3 rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-stone-50 font-sans overflow-x-hidden">
      <ReadingProgressBar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          {data.images && data.images[0] && (
            <Image
              loader={imageLoader}
              src={`https://kingsdevelopersapi.co.ke${data.images[0]}`}
              alt={data.name}
              fill
              className="object-cover"
              priority
            />
          )}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100/90 via-slate-900/50 to-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`border-white/30 text-white hover:bg-white/10 rounded-full px-4 backdrop-blur-sm ${
                  isBookmarked ? "bg-white/20" : "bg-transparent"
                }`}
              >
                <Bookmark className={`w-4 h-4 mr-1 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-4 backdrop-blur-sm bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-white/70 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <Link href="/news" className="hover:text-gold-400 transition-colors duration-300">
                  News
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gold-400 font-medium">{data.category}</span>
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <BreakingNewsAlert isBreaking={isBreakingNews} />

            <h1 className="font-serif text-4xl md:text-6xl font-light text-white leading-tight mb-6 tracking-tight">
              {data.name}
            </h1>

            <p className="text-white/90 text-xl leading-relaxed mb-8 font-light max-w-3xl">{data.metad}</p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">By {data.author}</span>
              </div>
              <div className="w-px h-5 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{moment(data.created_at).format("MMMM DD, YYYY")}</span>
              </div>
              <div className="w-px h-5 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>5 min read</span>
              </div>
              <div className="w-px h-5 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>2.1K views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Article */}
            <div className="lg:col-span-8">
              <LuxuryAuthorCard
                author={data.author}
                publishedDate={data.created_at}
                category={data.category}
                readingTime="5 min read"
              />

              {/* Article Content */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100/50 overflow-hidden mb-8">
                <div className="p-8 md:p-12">
                  <div
                    className="prose prose-lg prose-slate max-w-none
                      prose-headings:font-serif prose-headings:font-light prose-headings:text-slate-800
                      prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-light
                      prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-slate-800 prose-strong:font-semibold
                      prose-blockquote:border-l-4 prose-blockquote:border-gold-500 prose-blockquote:bg-gold-50/50 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl
                      prose-ul:text-slate-700 prose-ol:text-slate-700
                      prose-li:text-slate-700 prose-li:leading-relaxed
                      prose-img:rounded-2xl prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                </div>
              </div>

              {/* News Engagement */}
              <NewsEngagement newsUrl={newsUrl} title={data.name} />

              {/* Tags and Sharing */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100/50 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h4 className="font-serif text-lg font-light text-slate-800 mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-gold-500" />
                      Related Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.tags?.map((tag) => (
                        <TagButton key={tag} text={tag} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-serif text-lg font-light text-slate-800 mb-4 flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-gold-500" />
                      Share This Story
                    </h5>
                    <div className="flex items-center gap-3">
                      <SharePost text={newsUrl} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Table of Contents */}
              {showTableOfContents && <TableOfContents content={data.description} />}

              {/* Related News */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100/50 mb-8 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-serif text-xl font-light text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gold-500" />
                    Related Stories
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {relatedNews?.slice(0, 4).map((item) => (
                    <RelatedNewsCard
                      key={item.id}
                      title={item.name}
                      image={`https://kingsdevelopersapi.co.ke${item.images[0]}`}
                      slug={`/project/${item.name.replace(/,?\s+/g, "-").toLowerCase()}_${item.id}`}
                      date={moment(item.created_at).fromNow()}
                      category={item.type}
                      isBreaking={item.priority === "high"}
                    />
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100/50 mb-8 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-serif text-xl font-light text-slate-800 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-gold-500" />
                    Trending Topics
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {data.tags?.map((tag) => (
                      <TagButton key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-br from-gold-50 to-gold-100/50 rounded-3xl p-8 shadow-xl border border-gold-500/20 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/30 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className="font-serif text-xl font-light text-slate-800 mb-3">Stay Updated</h3>
                  <p className="text-slate-600/80 text-sm font-light mb-6 leading-relaxed">
                    Get breaking news alerts and market insights delivered to your inbox
                  </p>
                  <NewsLatterBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Consultation CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=2000')] bg-cover bg-center opacity-5" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block w-1 h-8 bg-gold-500 mb-6"></div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
                Need Expert
                <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                  Market Analysis?
                </span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed font-light mb-8">
                Stay ahead of market trends with personalized insights from our real estate experts. Get professional
                guidance on investment opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="flex-1">
                <Button className="w-full bg-gold-500 hover:bg-gold-600 text-slate-900 px-8 py-4 font-sans font-medium rounded-full shadow-lg transition-all duration-300">
                  <Phone className="mr-2 w-5 h-5" />
                  Expert Consultation
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 font-sans font-medium rounded-full backdrop-blur-sm bg-transparent"
                >
                  <Building className="mr-2 w-5 h-5" />
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

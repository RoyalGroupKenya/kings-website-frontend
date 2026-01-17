"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import RelatedPost from "@/components/Blog/RelatedPost"
import SharePost from "@/components/Blog/SharePost"
import TagButton from "@/components/Blog/TagButton"
import {
  Calendar,
  Clock,
  Eye,
  Share2,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Bookmark,
  ChevronRight,
  Tag,
  ChevronDown,
  MessageCircle,
  Star,
} from "lucide-react"
import moment from "moment"

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// Enhanced Reading Progress Component
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // This code is safe because useEffect only runs on the client
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
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Mobile-Optimized Article Header Component
const LuxuryArticleHeader = ({ data }: { data: any }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const readingTime = Math.ceil((data?.description?.length || 0) / 1000)

  return (
    <div className="relative">
      {/* Mobile-Optimized Hero Image */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 lg:mb-12 shadow-xl sm:shadow-2xl">
        <Image
          loader={imageLoader}
          src={`https://kingsdevelopersapi.co.ke${data?.images?.[0]}`}
          alt={data?.name || "Article image"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        {/* Mobile-Friendly Back Button */}
        <Link
          href="/blogs"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-slate-800 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Link>

        {/* Mobile-Optimized Category Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-slate-900 text-xs sm:text-sm font-semibold shadow-lg">
            {data?.category || "Investment Guide"}
          </span>
        </div>

        {/* Mobile-Optimized Meta Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/80 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{readingTime} min read</span>
              </div>
              <div className="w-px h-3 sm:h-4 bg-white/30"></div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">2.5K views</span>
                <span className="xs:hidden">2.5K</span>
              </div>
              <div className="w-px h-3 sm:h-4 bg-white/30"></div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{moment(data?.created_at).format("MMM DD, YYYY")}</span>
                <span className="sm:hidden">{moment(data?.created_at).format("MMM DD")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Article Title and Meta */}
      <div className="mb-8 sm:mb-12">
        {/* Mobile-Friendly Breadcrumb */}
        <nav className="mb-4 sm:mb-6">
          <ol className="flex items-center space-x-1 sm:space-x-2 text-slate-500 text-xs sm:text-sm">
            <li>
              <Link href="/" className="hover:text-gold-600 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" />
              <Link href="/blogs" className="hover:text-gold-600 transition-colors duration-300">
                Insights
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" />
              <span className="text-gold-600 font-medium">Article</span>
            </li>
          </ol>
        </nav>

        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-slate-800 leading-tight mb-6 sm:mb-8 tracking-tight">
          {data?.name}
        </h1>

        {/* Mobile-Optimized Author and Meta Information */}
        <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 bg-stone-50 rounded-xl sm:rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Author Avatar */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/30 flex items-center justify-center text-gold-600 font-serif text-lg sm:text-xl font-semibold shadow-lg flex-shrink-0">
              {data?.author?.charAt(0) || "K"}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg sm:text-xl font-medium text-slate-800 truncate">
                {data?.author || "Kings Developers"}
              </h3>
              <p className="text-slate-600 font-light text-sm sm:text-base">Real Estate Investment Expert</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">
                <span>Published {moment(data?.created_at).format("MMM DD, YYYY")}</span>
                <div className="w-px h-3 bg-slate-300"></div>
                <span>{readingTime} minute read</span>
              </div>
            </div>
          </div>

          {/* Mobile-Optimized Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm ${
                isBookmarked
                  ? "bg-gold-50 border-gold-200 text-gold-700"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Bookmark className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 ${isBookmarked ? "fill-current" : ""}`} />
              {isBookmarked ? "Saved" : "Save"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
            >
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Share
            </Button>

            <Link href="/contact" className="flex-1 sm:flex-none">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm">
                Get Expert Advice
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mobile-Optimized Sidebar Component
const LuxurySidebar = ({ data, relatedPosts }: { data: any; relatedPosts: any[] }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  // FIX: State to ensure window object is available before use
  const [isClient, setIsClient] = useState(false)

  // FIX: Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  // FIX: Check if isClient is true before accessing window.innerWidth
  const showToc = isClient ? activeSection === "toc" || window.innerWidth >= 1024 : activeSection === "toc"

  return (
    <div className="space-y-6  sm:space-y-8">
      {/* Mobile-Collapsible Table of Contents */}
      <Card className="border-0 shadow-lg sm:shadow-xl bg-white">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <button
            onClick={() => toggleSection("toc")}
            className="flex lg:hidden items-center justify-between w-full mb-4"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-light text-slate-800">Table of Contents</h3>
            </div>
            <ChevronDown
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                activeSection === "toc" ? "rotate-180" : ""
              }`}
            />
          </button>

          <div className="hidden lg:flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold-500" />
            </div>
            <h3 className="font-serif text-xl font-light text-slate-800">Table of Contents</h3>
          </div>

          <nav className={`space-y-2 sm:space-y-3 ${showToc ? "block" : "hidden lg:block"}`}>
            {[
              "Market Overview",
              "Investment Strategies",
              "Risk Assessment",
              "Future Outlook",
              "Expert Recommendations",
            ].map((item, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="block text-sm sm:text-base text-slate-600 hover:text-gold-600 transition-colors duration-300 font-light leading-relaxed border-l-2 border-transparent hover:border-gold-500 pl-3 sm:pl-4 py-1 sm:py-1.5"
              >
                {item}
              </a>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Mobile-Optimized Related Posts */}
      <Card className="border-0 shadow-lg sm:shadow-xl bg-white">
        <CardContent className="p-0">
          <div className="p-4 sm:p-6 lg:p-8 border-b border-slate-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-light text-slate-800">Related Articles</h3>
            </div>
            <p className="text-slate-600 font-light text-xs sm:text-sm">
              More insights to help your investment journey
            </p>
          </div>
          <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {relatedPosts?.slice(0, 3).map((item, index) => (
              <div key={item.id} className="group">
                <RelatedPost
                  title={item.name}
                  image={`${item.images[0]}`}
                  slug={`/project-page/${item.name.replace(/,?\s+/g, "-").toLowerCase()}_${item.id}`}
                  date={item.type}
                />
                {index < 2 && <div className="mt-4 sm:mt-6 border-b border-slate-100"></div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mobile-Optimized Popular Tags */}
      <Card className="border-0 shadow-lg sm:shadow-xl bg-white">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-light text-slate-800">Popular Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {data?.tags?.map((tag: string, index: number) => (
              <TagButton key={index} text={tag} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mobile-Optimized Article Content Component
const LuxuryArticleContent = ({ data }: { data: any }) => {
  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
      {/* Mobile-Optimized Article Lead */}
      <div className="text-base sm:text-lg lg:text-xl text-slate-600 font-light leading-relaxed mb-8 sm:mb-12 p-4 sm:p-6 lg:p-8 bg-stone-50 rounded-xl sm:rounded-2xl border-l-4 border-gold-500">
        {data?.metad}
      </div>

      {/* Mobile-Optimized Main Content */}
      <div
        className="prose-headings:font-serif prose-headings:font-light prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:font-light prose-p:leading-relaxed prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-strong:font-semibold prose-ul:text-slate-700 prose-ol:text-slate-700 prose-blockquote:border-gold-500 prose-blockquote:bg-gold-50 prose-blockquote:p-4 sm:prose-blockquote:p-6 prose-blockquote:rounded-xl prose-blockquote:not-italic prose-blockquote:font-light prose-img:rounded-xl prose-img:shadow-lg"
        dangerouslySetInnerHTML={{ __html: data?.description }}
      />

      {/* Mobile-Optimized Article Footer */}
      <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-200">
        <div className="bg-gradient-to-r from-stone-50 to-gold-50/30 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-light text-slate-800 mb-2">Found this helpful?</h4>
              <p className="text-slate-600 font-light text-sm sm:text-base">
                Share your thoughts or get personalized advice from our experts
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="/diaspora-forum" className="flex-1 sm:flex-none">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent text-xs sm:text-sm"
                  >
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Discuss
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent text-xs sm:text-sm"
                >
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Rate
                </Button>
              </div>
              <Link href="/contact" className="flex-1 sm:flex-none">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm">
                  Get Expert Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Tags and Share Section */}
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div>
            <h4 className="font-serif text-base sm:text-lg font-medium text-slate-800 mb-3 sm:mb-4">Article Topics</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {data?.tags?.map((tag: string, index: number) => (
                <TagButton key={index} text={tag} />
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-serif text-base sm:text-lg font-medium text-slate-800 mb-3 sm:mb-4">
              Share This Article
            </h5>
            <div className="flex items-center">
              <SharePost text={`/blog-page/${data?.name?.replace(/,?\s+/g, "-").toLowerCase()}_${data?.id}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Mobile-Optimized Blog Detail Component
export default function LuxuryBlogDetailPage({ data, relatedPosts }: { data: any; relatedPosts: any[] }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="bg-stone-50 pt-10 font-sans overflow-x-hidden">
      <ReadingProgress />

      <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <LuxuryArticleHeader data={data} />
                <LuxuryArticleContent data={data} />
              </div>

              {/* Mobile-Responsive Sidebar */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <LuxurySidebar data={data} relatedPosts={relatedPosts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Next/Previous Article Navigation */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
            <Link
              href="/blogs"
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-stone-50 hover:bg-stone-100 rounded-xl sm:rounded-2xl transition-colors duration-300"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wider">Previous</p>
                <h3 className="font-serif text-sm sm:text-lg font-light text-slate-800 group-hover:text-gold-600 transition-colors duration-300 truncate">
                  Back to All Articles
                </h3>
              </div>
            </Link>

            <Link
              href="/contact"
              className="group flex items-center justify-end gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-gold-50 to-gold-100/50 hover:from-gold-100/50 hover:to-gold-100 rounded-xl sm:rounded-2xl transition-colors duration-300"
            >
              <div className="text-right min-w-0">
                <p className="text-xs sm:text-sm text-gold-700 font-medium uppercase tracking-wider">Next Step</p>
                <h3 className="font-serif text-sm sm:text-lg font-light text-slate-800 group-hover:text-gold-600 transition-colors duration-300 truncate">
                  Get Expert Consultation
                </h3>
              </div>
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gold-600" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=2000')] bg-cover bg-center opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block w-1 h-8 sm:h-12 bg-gold-500 mb-6 sm:mb-8"></div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 sm:mb-8 tracking-tight">
            Ready to Take
            <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              Action?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Turn your knowledge into investment success. Our property experts are ready to guide you through your next
            real estate investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-sans font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
                Schedule Free Consultation
              </Button>
            </Link>
            <Link href="/projects" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-sans font-semibold rounded-full backdrop-blur-sm bg-transparent"
              >
                View Investment Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
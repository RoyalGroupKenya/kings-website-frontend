"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Home,
  Building,
  LineChart,
  Shield,
  Users,
  ArrowRight,
  Play,
  Calendar,
  Mail,
  Phone,
} from "lucide-react"
import LuxuryFAQSection from "@/components/About/faq"
import { useEffect, useState } from "react"

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// Enhanced Counter with luxury styling and intersection observer
const LuxuryCounter = ({ target, title, suffix = "%", duration = 2000, icon: Icon }) => {
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

    const element = document.getElementById(`diaspora-counter-${title}`)
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
    <div id={`diaspora-counter-${title}`} className="text-center group">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
        <Icon className="w-10 h-10 text-gold-500 transition-colors duration-500" />
      </div>
      <div className="text-5xl md:text-6xl font-serif font-light bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent mb-3">
        {count}
        {suffix}
      </div>
      <div className="text-slate-600/80 font-sans text-sm uppercase tracking-widest font-medium">{title}</div>
    </div>
  )
}

// Value Proposition Card
const ValueCard = ({ icon: Icon, title, description, link, linkText }) => (
  <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
 
    <CardContent className="p-8 relative">
      
      <h3 className="mb-4 text-xl font-serif font-light text-slate-800">{title}</h3>
      <p className="text-slate-600/80 mb-4 font-light leading-relaxed">{description}</p>
      <Link href={link} className="inline-flex items-center text-gold-600 font-medium hover:underline">
        {linkText} <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </CardContent>
  </Card>
)

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

export default function LuxuryDiasporaInvestment() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="bg-stone-50 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            loader={imageLoader}
            src="/nai.jpg"
            alt="Diaspora Investment in Kenya"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className={`${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
            {/* Minimal Brand Mark */}
            <div className="mb-16">
              <div className="mx-auto w-1 h-16 bg-transparent mb-8"></div>
              <p className="text-gold-400 font-sans font-medium tracking-[0.3em] uppercase text-sm">
                Diaspora Investment Opportunities
              </p>
            </div>

            {/* Hero Headline */}
            <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.85] mb-12 tracking-tight">
              Own Your
              <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Piece of Kenya
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-white/80 text-sm md:text-lg font-light leading-relaxed mb-20 max-w-4xl mx-auto tracking-wide">
              Whether you're a Kenyan in the diaspora longing for a connection back home or a foreign investor seeking
              high-growth opportunities, Kings Developers makes investing in Kenya seamless, secure, and rewarding.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              <Link href="/contact">
                <Button className="bg-gold-500 hover:bg-gold-600 text-slate-900 px-12 py-6 text-lg font-sans font-medium rounded-full shadow-xl transition-all duration-300">
                  Start My Journey Home
                </Button>
              </Link>
              <Link href="https://www.youtube.com/watch?v=HCcU6OZzYu8">
                <Button
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-lg font-sans font-medium rounded-full backdrop-blur-sm flex items-center gap-3 bg-transparent"
                >
                  <Play className="h-4 w-4" />
                  Watch Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block w-1 h-12 bg-gold-500 mb-8"></div>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-slate-800 mb-8 tracking-tight">
              Investment
              <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Returns
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <LuxuryCounter target={7.5} title="Average Rental Yield" suffix="%" icon={LineChart} />
            <LuxuryCounter target={15} title="Annual Appreciation" suffix="%" icon={Building} />
            <LuxuryCounter target={500} title="Diaspora Investors" suffix="+" icon={Users} />
            <LuxuryCounter target={98} title="Client Satisfaction" suffix="%" icon={CheckCircle} />
          </div>
        </div>
      </section>

      {/* Why Invest in Kenya Section */}
      <section className="py-32 bg-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <LuxurySectionHeader
            eyebrow="Why Invest In Kenya From Abroad"
            title="Kenya Beckons"
            description="Discover why Kenya's real estate market offers unparalleled opportunities for diaspora investors looking for security, growth, and connection to home."
          />

          {/* Enhanced Image Gallery */}
          <div className="mb-16 relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="grid grid-cols-3 h-[400px]">
              <div className="col-span-2 relative">
                <Image
                  loader={imageLoader}
                  src="/hero.jpeg"
                  alt="Kenya Real Estate Investment"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-transparent flex items-center">
                  <div className="p-10 max-w-lg">
                    <h3 className="text-3xl font-serif font-light text-white mb-4">
                      A Growing Market With Endless Potential
                    </h3>
                    <p className="text-white/90 font-light leading-relaxed">
                      Kenya's real estate sector continues to outperform many global markets, offering exceptional
                      returns for foreign investors.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-rows-2">
                <div className="relative">
                  <Image
               
                    src="/projects/49/image-1729249052988-967058807.jpg"
                    alt="Luxury Property"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative">
                  <Image
                     loader={imageLoader}
                    src="/nairobi.webp"
                    alt="Commercial Property"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              icon={Building}
              title="Kenya's Thriving Property Market"
              description="A stable economy and strong demand drive real estate growth."
              link="https://kingsdevelopers.com/blog-page/navigating-kenyas-real-estate-market-in-2025_40"
              linkText="Learn more"
            />
            <ValueCard
              icon={LineChart}
              title="High Returns in Kenya's Key Cities"
              description="Nairobi, Mombasa, and Kisumu offer competitive rental yields and capital appreciation."
              link="https://kingsdevelopers.com/blog-page/the-roi-of-real-estate-investment-in-kenya_11"
              linkText="Learn more"
            />
            <ValueCard
              icon={Shield}
              title="Government Support for Diaspora Investors"
              description="Enjoy investment-friendly policies, including incentives and ease of funds transfer."
              link="#"
              linkText="Learn more"
            />
            <ValueCard
              icon={CheckCircle}
              title="Stable and Growing Property Sector"
              description="Secure, long-term investment opportunities in residential, commercial, and land sectors."
              link="#"
              linkText="Learn more"
            />
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact">
              <Button className="bg-gold-500 hover:bg-gold-600 text-slate-900 px-12 py-6 text-lg font-sans font-medium rounded-full shadow-xl transition-all duration-300">
                Explore My Investment Options in Kenya
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Opportunities Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <LuxurySectionHeader
            eyebrow="Investment Options"
            title="Investment Opportunities"
            description="Your Gateway to Kenyan Real Estate: Tailored Investment Solutions"
          />

          <div className="grid gap-12 md:grid-cols-2">
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl">
                <Image
                  loader={imageLoader}
                  src="/l1.jpg"
                  alt="Ready-to-Move Homes"
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-serif font-light text-white mb-2">Ready-to-Move Homes</h3>
                  <p className="text-white/80 font-light">Own an apartment in prime locations.</p>
                </div>
              </div>
              <p className="text-slate-600/80 mb-4 font-light leading-relaxed">
                Step into your dream Kenyan home right away with our selection of completed villas, apartments, and
                townhouses in prime locations.
              </p>
              <Link
                href="/projects/Completed/"
                className="inline-flex items-center text-gold-600 font-medium hover:underline"
              >
                View Ready Homes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl">
                <Image
                  src="/off.jpeg"
                  loader={imageLoader}
                  alt="Off-Plan Investments"
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-serif font-light text-white mb-2">Off-Plan Investments</h3>
                  <p className="text-white/80 font-light">Maximize Returns with Early Bird Advantages</p>
                </div>
              </div>
              <p className="text-slate-600/80 mb-4 font-light leading-relaxed">
                Secure your property at below market value and enjoy up to 30% appreciation upon completion with our
                carefully selected off-plan projects.
              </p>
              <Link
                href="/projects/Under-Construction/"
                className="inline-flex items-center text-gold-600 font-medium hover:underline"
              >
                Explore Off-Plan Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl">
                <Image
                  loader={imageLoader}
                  src="/l3.jpg"
                  alt="Rental Income Properties"
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-serif font-light text-white mb-2">Rental Income Properties</h3>
                  <p className="text-white/80 font-light">Generate Passive Income & Build Wealth</p>
                </div>
              </div>
              <p className="text-slate-600/80 mb-4 font-light leading-relaxed">
                Let your investment work for you, generating consistent income with our fully-managed rental properties
                in high-demand locations.
              </p>
              <Link href="/to-let" className="inline-flex items-center text-gold-600 font-medium hover:underline">
                Discover Rental Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl">
                <Image
                  loader={imageLoader}
                  src="/hero.jpeg"
                  alt="Commercial projects by kings developers"
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-serif font-light text-white mb-2">Commercial Properties</h3>
                  <p className="text-white/80 font-light">Invest in Kenya's Business Boom</p>
                </div>
              </div>
              <p className="text-slate-600/80 mb-4 font-light leading-relaxed">
                Tap into Kenya's entrepreneurial spirit and booming economy with our selection of shops, offices, and
                warehouses in strategic locations.
              </p>
              <Link
                href="/type/Commercial"
                className="inline-flex items-center text-gold-600 font-medium hover:underline"
              >
                View Commercial Options <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/projects">
              <Button className="bg-gold-500 hover:bg-gold-600 text-slate-900 px-12 py-6 text-lg font-sans font-medium rounded-full shadow-xl transition-all duration-300">
                View Properties That Fit My Goals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero.jpeg')] bg-cover bg-center opacity-5" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="mx-auto w-1 h-12 bg-gold-500 mb-8"></div>
            <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase rounded-full bg-gold-500/10">
              Our Process
            </span>
            <h2 className="mb-6 text-5xl md:text-6xl font-serif font-light text-white tracking-tight">
              Invest with
              <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Confidence
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-white/70 text-xl leading-relaxed font-light">
              We've simplified the property investment journey for Kenyans abroad, ensuring a smooth experience from
              consultation to handover.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-500 group">
              <CardContent className="p-12">
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-8 group-hover:bg-gold-500/20 transition-colors duration-500">
                  <div className="bg-gold-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-light text-slate-800 mb-4">Personalized Consultation</h3>
                <p className="text-slate-700/80 text-md leading-relaxed font-light mb-6">
                  Your Dedicated Expert Guide Awaits. Get personalized advice tailored to your investment needs and
                  goals through video calls or in-person meetings when you visit Kenya.
                </p>
                <div className="relative h-[200px] rounded-xl overflow-hidden">
                  <Image
                    loader={imageLoader}
                    src="/team.jpeg"
                    alt="Personalized Consultation"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-500 group">
              <CardContent className="p-12">
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-8 group-hover:bg-gold-500/20 transition-colors duration-500">
                  <div className="bg-gold-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-light text-slate-800 mb-4">Virtual Property Selection</h3>
                <p className="text-slate-700/80 text-md leading-relaxed font-light mb-6">
                  Explore Your Dream Property From Anywhere in the World. View properties comfortably from your current
                  location through our immersive 3D tours and detailed property presentations.
                </p>
                <div className="relative h-[200px] rounded-xl overflow-hidden">
                  <Image
                    loader={imageLoader}
                    src="/process/1.png"
                    alt="Virtual Property Selection"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-500 group">
              <CardContent className="p-12">
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-8 group-hover:bg-gold-500/20 transition-colors duration-500">
                  <div className="bg-gold-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-light text-slate-800 mb-4">Secure Purchase Process</h3>
                <p className="text-slate-700/80 text-md leading-relaxed font-light mb-6">
                  Our team handles all legal documentation and ensures a smooth, transparent transaction process with
                  regular updates at every stage.
                </p>
                <div className="relative h-[200px] rounded-xl overflow-hidden">
                  <Image
                    loader={imageLoader}
                    src="/process/3.png"
                    alt="Secure Purchase Process"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact">
              <Button className="bg-gold-500 hover:bg-gold-600 text-slate-900 px-12 py-6 text-lg font-sans font-medium rounded-full shadow-xl transition-all duration-300">
                Book My Free & Confidential Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <LuxurySectionHeader
            eyebrow="Financing Options"
            title="Flexible Financing"
            description="We've created financing solutions specifically designed for diaspora investors, making your journey to property ownership smooth and accessible."
          />

          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                loader={imageLoader}
                src="/process/1.png"
                alt="Financing Options"
                width={600}
                height={500}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif font-light text-white mb-4">Tailored Financial Solutions</h3>
                <p className="text-white/90 text-lg font-light leading-relaxed">
                  Our financing options are designed specifically for diaspora investors, with flexible terms and
                  competitive rates.
                </p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-serif font-light text-slate-800">Flexible Installment Plans</h3>
                  <p className="text-slate-600/80 font-light leading-relaxed">
                    Spread Payments, Maximize Affordability. Pay in manageable installments throughout the construction
                    period, with as little as 10% down payment to secure your property.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-serif font-light text-slate-800">
                    Mortgage Facilitation with Top Kenyan Banks
                  </h3>
                  <p className="text-slate-600/80 font-light leading-relaxed">
                    Get expert insights on accessing financing from top Kenyan banks as a diaspora or foreign investor.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-serif font-light text-slate-800">
                    Secure International Payment Options
                  </h3>
                  <p className="text-slate-600/80 font-light leading-relaxed">
                    Direct Transfers & Mobile Payments Accepted. We accept SWIFT transfers, M-Pesa, and other secure
                    international payment methods for your convenience.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-gold-500 hover:bg-gold-600 text-slate-900 px-12 py-6 text-lg font-sans font-medium rounded-full shadow-xl transition-all duration-300">
                    Explore My Financing Options
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Management Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <LuxurySectionHeader
            eyebrow="Property Management"
            title="Peace of Mind Ownership"
            description="Our comprehensive property management services ensure your investment is well-maintained and profitable, even when you're thousands of miles away."
          />

          {/* Image Banner */}
          <div className="mb-16 relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
            <Image loader={imageLoader} src="/hero.jpeg" alt="Property Management" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-transparent flex items-center">
              <div className="p-10 max-w-lg">
                <h3 className="text-3xl font-serif font-light text-white mb-4">Comprehensive Management Services</h3>
                <p className="text-white/90 mb-6 font-light leading-relaxed">
                  Our team handles everything from tenant screening to maintenance, ensuring your property remains in
                  perfect condition and generates optimal returns.
                </p>
                <Link href="/services/property-management">
                  <Button className="bg-white text-slate-800 hover:bg-white/90 px-6 py-4 text-base font-sans font-medium rounded-full h-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white group">
              <CardContent className="p-8">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="mb-4 text-2xl font-serif font-light text-slate-800">Tenant Management Made Easy</h3>
                <p className="text-slate-600/80 mb-6 font-light leading-relaxed">
                  Hassle-Free Rental Income, Handled by Us. Our comprehensive tenant management includes thorough tenant
                  screening, professional lease agreements, and reliable rent collection - all while you're abroad.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gold-500" />
                    <span className="text-slate-600/80 font-light">Rigorous tenant screening process</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gold-500" />
                    <span className="text-slate-600/80 font-light">Professional lease agreements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gold-500" />
                    <span className="text-slate-600/80 font-light">Timely rent collection and remittance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white group">
              <CardContent className="p-8">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  <Home className="h-10 w-10" />
                </div>
                <h3 className="mb-4 text-2xl font-serif font-light text-slate-800">Proactive Property Maintenance</h3>
                <p className="text-slate-600/80 mb-6 font-light leading-relaxed">
                  Protecting Your Investment, Year-Round. We conduct regular inspections, coordinate repairs with
                  trusted contractors, and implement preventative maintenance to keep your property in excellent
                  condition.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gold-500" />
                    <span className="text-slate-600/80 font-light">Regular property inspections</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gold-500" />
                    <span className="text-slate-600/80 font-light">Coordination with trusted contractors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gold-500" />
                    <span className="text-slate-600/80 font-light">Preventative maintenance programs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white group">
              <CardContent className="p-8">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="mb-4 text-2xl font-serif font-light text-slate-800">
                  Expert Legal & Compliance Assistance
                </h3>
                <p className="text-slate-600/80 mb-6 font-light leading-relaxed">
                  Ensuring Your Property Stays Secure & Compliant. We handle lease agreement enforcement, stay updated
                  on legal changes affecting your property, and ensure compliance with all local regulations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gold-500" />
                    <span className="text-slate-600/80 font-light">Lease agreement enforcement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gold-500" />
                    <span className="text-slate-600/80 font-light">Updates on relevant legal changes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gold-500" />
                    <span className="text-slate-600/80 font-light">Compliance with local regulations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact">
              <Button className="bg-gold-500 hover:bg-gold-600 text-slate-900 px-12 py-6 text-lg font-sans font-medium rounded-full shadow-xl transition-all duration-300">
                Discover Hassle-Free Property Management
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <LuxurySectionHeader
            eyebrow="Success Stories"
            title="Hear From Our Diaspora Investors"
            description="Real experiences from investors who've successfully built their Kenyan property portfolio with us."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <CardContent className="p-8">
                <p className="text-slate-600/80 italic mb-6 font-light leading-relaxed">
                  "Kings Developers made investing in Kenyan real estate from abroad seamless. Their virtual tours and
                  transparent process gave me confidence, and my property has appreciated 20% in just 18 months."
                </p>
                <div className="flex text-gold-500 mb-4">
                  <span>★★★★★</span>
                </div>
                <div className="text-slate-700 font-medium">Sarah M.</div>
                <div className="text-slate-500 text-sm">Diaspora Investor, USA</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <CardContent className="p-8">
                <p className="text-slate-600/80 italic mb-6 font-light leading-relaxed">
                  "Their property management service is exceptional. I own two rental properties in Nairobi, and they
                  handle everything while I'm in the US. The monthly rental income is consistent and hassle-free."
                </p>
                <div className="flex text-gold-500 mb-4">
                  <span>★★★★★</span>
                </div>
                <div className="text-slate-700 font-medium">James K.</div>
                <div className="text-slate-500 text-sm">Property Investor, UK</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <CardContent className="p-8">
                <p className="text-slate-600/80 italic mb-6 font-light leading-relaxed">
                  "I was hesitant about investing from abroad, but Kings Developers' team walked me through every step.
                  Their financing options made it affordable, and now I own a beautiful apartment in Nairobi."
                </p>
                <div className="flex text-gold-500 mb-4">
                  <span>★★★★★</span>
                </div>
                <div className="text-slate-700 font-medium">Grace W.</div>
                <div className="text-slate-500 text-sm">First-time Investor, Canada</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <LuxuryFAQSection />

    </div>
  )
}

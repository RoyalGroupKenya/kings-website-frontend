"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Building,
  Shield,
  ArrowRight,
  Play,
  Users,
  Award,
  Clock,
  Target,
  Heart,
  Leaf,
  Calendar,
  Mail,
  Phone,
} from "lucide-react"
import { useEffect, useState } from "react"
import FAQSection from "@/components/About/faq"

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// Enhanced Counter with luxury styling and intersection observer
const LuxuryCounter = ({ target, title, icon: Icon, duration = 2000 }) => {
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

    const element = document.getElementById(`counter-${title}`)
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
    <div id={`counter-${title}`} className="text-center group">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
        <Icon className="w-10 h-10 text-gold-500 transition-colors duration-500" />
      </div>
      <div className="text-5xl md:text-6xl font-serif font-light bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent mb-3">
        {count}+
      </div>
      <div className="text-slate-600/80 font-sans text-sm uppercase tracking-widest font-medium">{title}</div>
    </div>
  )
}

// Value Proposition Card
const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="text-center group">
    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/20 flex items-center justify-center group-hover:from-gold-500/20 group-hover:to-gold-600/30 transition-all duration-500">
      <Icon className="w-8 h-8 text-gold-500" />
    </div>
    <h4 className="font-serif text-2xl font-light text-slate-800 mb-4">{title}</h4>
    <p className="text-slate-600/80 leading-relaxed font-light">{description}</p>
  </div>
)

// Section header component for luxury styling
const LuxurySectionHeader = ({ eyebrow, title, description, invert = false }) => {
  const accentClasses = invert ? "text-gold-300 bg-white/10" : "text-gold-600 bg-gold-500/10"
  const dividerClass = invert ? "bg-white/60" : "bg-gold-500"
  const titleClass = invert ? "text-white" : "text-slate-800"
  const descriptionClass = invert ? "text-white/80" : "text-slate-600/70"

  return (
    <div className="text-center mb-20">
      <div className={`w-1 h-12 ${dividerClass} mb-8 mx-auto`}></div>
      <span className={`inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-[0.3em] uppercase rounded-full ${accentClasses}`}>
        {eyebrow}
      </span>
      <h2 className={`mb-6 text-5xl md:text-6xl font-serif font-light tracking-tight ${titleClass}`}>{title}</h2>
      <p className={`max-w-3xl mx-auto text-xl leading-relaxed font-light ${descriptionClass}`}>{description}</p>
    </div>
  )
}

const partnershipHighlights = [
  {
    title: "A Legacy of Trust and Excellence",
    description:
      "With over 20 years of experience and more than 45 successful projects across the country, we have established ourselves as a trusted name in real estate. Our developments are not just buildings—they are carefully crafted communities designed for comfort, security, and long-term value. When you invest with us, you're choosing a company that has stood the test of time, delivering quality homes with integrity and excellence.",
  },
  {
    title: "Strategic Locations with Unmatched Value",
    description:
      "Location is everything, and we ensure our projects are in prime, high-potential areas. Whether it's a thriving urban hub, a peaceful suburb, or a fast-growing investment zone, our developments are strategically positioned for accessibility, growth, and convenience. Every property we create is not just a place to live, but a smart investment in your future.",
  },
  {
    title: "Uncompromising Quality, Designed for You",
    description:
      "We take pride in our craftsmanship, using high-quality materials and meticulous attention to detail to ensure durability and timeless elegance. Every home is designed with modern aesthetics, functionality, and comfort in mind, reflecting our commitment to excellence. We don't just build houses—we create spaces that feel like home from the moment you step in.",
  },
  {
    title: "Flexible Payment Plans and Seamless Process",
    description:
      "We understand that purchasing a home is a major decision, which is why we offer flexible payment plans tailored to your needs. Our process is transparent, smooth, and customer-focused, ensuring that you have a stress-free experience from inquiry to handover. With us, home-ownership is not just a dream—it's an achievable reality.",
  },
  {
    title: "A Commitment to Your Future",
    description:
      "Choosing us means partnering with a developer who values long-term relationships. Our goal is not just to sell homes but to build communities where families can thrive and investments can grow. When you buy from us, you're not just acquiring property—you're securing a future built on trust, quality, and vision.",
  },
]

const timelineMilestones = [
  {
    year: "2004",
    title: "The Birth of a Dream",
    description:
      "With bold vision and unwavering determination, Kings Developers was founded - laying the foundation for a future of trust, innovation, and excellence.",
  },
  {
    year: "2007",
    title: "A Digital Frontier",
    description:
      "The launch of Royal ICT Business Park marked the beginning of our journey - blending technology, quality, and reliability to create spaces that inspire growth.",
  },
  {
    year: "2011",
    title: "Turning Dreams Into Reality",
    description:
      "With Muthama Heights, our first residential project, we brought dream homes to life, setting new standards in modern living.",
  },
  {
    year: "2015",
    title: "Spreading Our Wings",
    description:
      "The launch of Milimani Heights in Nakuru was a game-changer - our first step outside Nairobi, bringing premium living to more Kenyans.",
  },
  {
    year: "2017",
    title: "A Bold Step Upcountry",
    description:
      "With Kings Square in Eldoret, we ventured into upcountry markets, proving that quality knows no boundaries.",
  },
  {
    year: "2018",
    title: "Defining the Nairobi Skyline",
    description:
      "The iconic Kings Prism Tower redefined Nairobi's business district, becoming a prestigious home to top enterprises in Kenya.",
  },
  {
    year: "2020",
    title: "A Commitment to Affordable Living",
    description:
      "We embraced our responsibility to all Kenyans with Kings Serenity, ensuring quality homes were within reach for many.",
  },
  {
    year: "2024",
    title: "A Legacy in Motion",
    description:
      "Kings Developers is redefining real estate - building communities, creating value, and shaping Kenya's skyline.",
  },
]

export default function LuxuryAboutUs() {
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
            src="/king.png"
            alt="Kings Developers - Leading Property Developers in Kenya"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 text-center">
          <div className={`${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
          

            {/* Hero Headline */}
            <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.85] mt-20 mb-12 tracking-tight">
              Setting the
              <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Standard
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-white/80 text-sm md:text-xl font-light leading-relaxed mb-20 max-w-4xl mx-auto tracking-wide">
              For over 21 years, Kings Developers has crafted premium properties across Kenya, transforming landscapes
              with uncompromising excellence and innovation.
            </p>

            {/* Minimal Trust Indicators */}
            <div className="flex px-8 sm:px-0 justify-center items-center space-x-16 text-white/60 mb-16">
              <div className="text-center">
                <div className="textlg md:text-3xl font-serif font-light text-white mb-1">2004</div>
                <div className="text-xs font-sans uppercase tracking-wider">Established</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="textlg md:text-3xl font-serif font-light text-white mb-1">45+</div>
                <div className="text-xs font-sans uppercase tracking-wider">Projects</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="textlg md:text-3xl font-serif font-light text-white mb-1">8K+</div>
                <div className="text-xs font-sans uppercase tracking-wider">Families</div>
              </div>
            </div>

           
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="w-px h-8 bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/60"></div>
          </div>
        </div>
      </section>

      {/* Legacy Tribute Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-center">
            <div className="relative h-[400px] sm:h-[400px] lg:h-[440px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                loader={imageLoader}
                src="/holinesses.jpeg"
                alt="Their Holiness Dr. Syedna Mohammed Burhanuddin Saheb and Dr. Syedna Mufaddal Saifuddin Saheb"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" aria-hidden="true" />
            </div>

            <div className="space-y-8">
              <span className="inline-block px-4 py-2 text-xs font-semibold tracking-[0.3em] uppercase rounded-full text-gold-600 bg-gold-500/10">
                Our Inspiration
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
                Guided by Timeless Leadership
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-slate-600/80 font-light">
                Our business was founded and strengthened under the guidance of Dr. Syedna Mohammed Burhanuddin Saheb (RA) of revered memory, and continues to be inspired by the leadership of His Holiness Dr. Syedna Mufaddal Saifuddin Saheb (T.U.S.).
              </p>
            </div>
          </div>
        </div>
      </section>

  <section className="py-32 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=2000')] bg-cover bg-center opacity-5" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="mx-auto w-1 h-12 bg-gold-500 mb-8"></div>
            <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase rounded-full bg-gold-500/10">
              Our Philosophy
            </span>
            <h2 className="mb-6 text-5xl md:text-6xl font-serif font-light text-white tracking-tight">
              Vision &
              <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-white/70 text-xl leading-relaxed font-light">
              Guided by strong principles and a clear vision, Kings Developers is committed to excellence in every
              project we undertake.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Card className="border-0 shadow-none bg-transparent transition-all duration-500 group">
              <CardContent className="p-12">
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-8 group-hover:bg-gold-500/20 transition-colors duration-500">
                  <Target className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="font-serif text-3xl font-light text-white mb-6">Our Vision</h3>
                <p className="text-white text-lg leading-relaxed font-light">
                  To be Kenya’s leading real estate developer, delivering high-quality homes that offer exceptional
                  value for money. We are committed to building sustainable communities that positively impact both
                  society and the environment. As Kings Developers grows, so does our ability to shape a better
                  future—one home at a time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none bg-transparent transition-all duration-500 group">
              <CardContent className="p-12">
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-8 group-hover:bg-gold-500/20 transition-colors duration-500">
                  <Heart className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="font-serif text-3xl font-light text-white mb-6">Our Mission</h3>
                <div className="text-white text-lg leading-relaxed font-light space-y-6">
                  <p>
                    At Kings Developers, we are committed to creating lasting value by delivering high-quality homes
                    that fulfill the dreams of our buyers while upholding the highest standards of integrity.
                  </p>
                  <p>
                    Our greatest assets—our people, capital, and reputation—drive our relentless pursuit of excellence.
                    We believe that the buying experience is just as vital as the living experience, and we strive to
                    make both exceptional. As we grow, so does our impact, shaping communities, elevating lifestyles,
                    and setting new benchmarks in real estate.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* About Section One */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0">
          <Image
            loader={imageLoader}
            src="/hero.jpeg"
            alt="Kings Developers Headquarters"
            fill
            sizes="100vw"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/65" aria-hidden="true"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <LuxurySectionHeader
            eyebrow="Who We Are"
            title="Our Heritage"
            description={
              <>
                <strong className="text-gold-300 font-sans font-medium">Kings Developers Ltd (KDL)</strong> is one of
                Kenya's most successful and trusted real estate developers, with a legacy of excellence spanning
                over 20 years. Established in 2004, KDL is part of the Royal Group of Companies, a well-diversified business
                conglomerate with roots tracing back to 1954.
              </>
            }
            invert
          />

          <div className="max-w-5xl mx-auto space-y-10 text-lg text-white/80 leading-relaxed font-light text-center">
            <p>
              Over the years, we have grown into an industry leader, transforming Kenya's real estate landscape with
              landmark developments that define quality, innovation, and sustain ability. With over 45 completed projects
              across Kenya and East Africa, we have successfully delivered more than 8,000 homes, creating thriving communities and
              elevating lifestyles.
            </p>

            <p>
              Today, we are actively constructing over 5,000 residential units, further cementing our position as a
              driving force in the real estate sector. Our developments span residential, commercial, retail, hospitality,
              and mixed-use properties, catering to both local and international investors seeking value-driven
              opportunities.
            </p>

            <p>
              At KDL, our success is built on a strong foundation of trust, financial strength, and expertise. We bring
              together seasoned professionals across architecture, engineering, construction, marketing, and business
              management to meet the highest standards. Our commitment to quality, timely delivery, and customer
              satisfaction has earned us a reputation as Kenya's premier real estate developer, and we remain dedicated to
              shaping the nation's skyline while offering investment opportunities that drive economic growth and urban
              transformation.
            </p>
          </div>

          <blockquote className="mt-16 text-center text-white text-2xl md:text-3xl font-serif italic leading-relaxed">
            "Creating exceptional living spaces since 2004"
          </blockquote>
        </div>
      </section>

      {/* Vision & Mission Section */}
    

      {/* Why Partner Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <LuxurySectionHeader
            eyebrow="Why Choose Us"
            title="Why Partner with Kings"
            description="Each relationship is founded on trust, craftsmanship, and a clear path to long-term value."
          />

          <div className="grid gap-10 sm:grid-cols-1 xl:grid-cols-1">
            {partnershipHighlights.map((item, index) => (
              <Card key={item.title} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group">
                <CardContent className="p-10 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 font-semibold tracking-widest group-hover:bg-gold-500/20 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-serif text-3xl font-light text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-slate-600/90 font-light">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <LuxurySectionHeader
            eyebrow="Our Values"
            title="Core Principles"
            description="The principles that guide every decision and define our commitment to excellence"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <ValueCard
              icon={Shield}
              title="Integrity"
              description="Unwavering commitment to ethical practices, transparency, and honest communication in all our relationships."
            />
            <ValueCard
              icon={Award}
              title="Excellence"
              description="Relentless pursuit of the highest standards in design, construction, and service delivery."
            />
            <ValueCard
              icon={Leaf}
              title="Sustainability"
              description="Environmental responsibility and sustainable practices that benefit future generations."
            />
            <ValueCard
              icon={Users}
              title="Community"
              description="Building lasting relationships and contributing positively to the communities we serve."
            />
          </div>
        </div>
      </section>

      {/* Legacy Timeline Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            loader={imageLoader}
            src="/king.png"
            alt="Kings Developers legacy montage"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/85" aria-hidden="true" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <span className="inline-block px-4 py-2 text-xs font-semibold tracking-[0.3em] uppercase rounded-full text-gold-300 bg-white/10">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light">
              Milestones of Excellence
            </h2>
            <p className="text-lg leading-relaxed text-white/75 font-light">
              From our first bold step in 2004 to shaping Kenya's skyline today, every chapter reflects a dedication to progress, partnership, and purpose.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {timelineMilestones.map((milestone) => (
              <div
                key={`${milestone.year}-${milestone.title}`}
                className="space-y-4 rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 shadow-lg shadow-black/30"
              >
                <div>
                  <p className="text-3xl font-serif font-semibold tracking-[0.3em] uppercase">
                    {milestone.year}
                  </p>
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70">
                    - {milestone.title}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-white/80 font-light">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center text-white/80 font-light text-lg max-w-3xl mx-auto">
            This is the story of Kings Developers: a journey of ambition, innovation, and excellence that continues to unfold.
          </div>
        </div>
      </section>

      {/* Green Building Section */}
      <section className="py-32 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=2000')] bg-cover bg-fixed opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="mx-auto w-1 h-12 bg-gold-500 mb-8"></div>
            <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase rounded-full bg-gold-500/10">
              Sustainability
            </span>
            <h2 className="mb-6 text-5xl md:text-6xl font-serif font-light text-white tracking-tight">
              Building Green,
              <span className="block font-normal bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Rebuilding Earth
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-white/70 text-xl leading-relaxed font-light">
              Our commitment to sustainable development and environmental responsibility is at the core of everything we
              do.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-light text-slate-800 mb-4">Eco-Friendly Materials</h3>
                <p className="text-slate-600/80 font-light leading-relaxed">
                  We carefully select sustainable building materials that minimize environmental impact while
                  maintaining luxury standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-light text-slate-800 mb-4">Energy Efficiency</h3>
                <p className="text-slate-600/80 font-light leading-relaxed">
                  Our properties incorporate energy-efficient designs and systems to reduce consumption and lower carbon
                  footprints.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-light text-slate-800 mb-4">Water Conservation</h3>
                <p className="text-slate-600/80 font-light leading-relaxed">
                  We implement water-saving fixtures and rainwater harvesting systems in our developments to preserve
                  this precious resource.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

    </div>
  )
}

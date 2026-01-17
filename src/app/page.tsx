import AboutSectionOne from "@/components/About/AboutSectionOne";
import Projects from "@/components/Projects";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import supabase from "@/db/supabase";
import { Shield, TrendingUp } from "lucide-react";
import CommitmentSection from "@/components/Home/commitment-section";

export const metadata = {
  metadataBase: new URL('https://kingsdevelopers.com'),
  alternates: {
    canonical:"/",
  },
  title: "Kings Developers | Your Home Of Luxury Living",
  description: 'Find affordable houses and apartments in Nairobi and outskirts with Kings Developers. Your trusted partner for Kenyan real estate.',
  openGraph: {
    title: "Kings Developers | Your Home Of Luxury Living",
    description: 'Find affordable houses and apartments in Nairobi and outskirts with Kings Developers. Your trusted partner for Kenyan real estate.',
    url: 'https://kingsdevelopers.com',
    siteName: 'Kings Developers',
    images: [
      {
        url:"/logo.png",
        width: 1200,
        height: 630,
        alt: "Kings Developers | Your Home Of Luxury Living"        }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Kings Developers | Your Home Of Luxury Living",
    description: "Find affordable houses and apartments in Nairobi and outskirts with Kings Developers. Your trusted partner for Kenyan real estate.",
    creator: "@kingsdevelopers",
    images: [{
      url:"/logo.png",
      width: 900,
      height: 475,
      alt: "Kings Developers | Your Home Of Luxury Living" }],
  }
}

export async function getData(){
  
}

export default async function Home() {
  const {data:projects,error:e} = await supabase
  .from("projects")
  .select("*")
  .eq("status","Under-Construction")
  .limit(6)
  .order('created_at', { ascending: false })

  const TrustBadge = ({ icon: Icon, title, description }) => (
  <div className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gold-200/50 hover:bg-white hover:shadow-xl transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
      <Icon className="w-6 h-6 text-gold-500" />
    </div>
    <div>
      <h4 className="font-montserrat font-semibold text-navy-800">{title}</h4>
      <p className="text-sm text-navy-600">{description}</p>
    </div>
  </div>
)

  return (
    <>
      <ScrollUp />
      <Hero />
     

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" aria-hidden="true" />
        <div className="absolute inset-y-0 left-1/2 w-1/2 bg-[url('/placeholder.svg?height=800&width=800')] opacity-10" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white space-y-8">
          <span className="inline-block px-4 py-2 text-xs font-semibold tracking-[0.3em] uppercase rounded-full bg-white/10 text-gold-300">
            Our Philosophy
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
            The true strength of a structure lies not only in its beauty but in the integrity of its foundation — built to endure and stand the test of time.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed font-light">
            Every project we craft is a promise to future generations, engineered with precision, grounded in trust, and destined to inspire.
          </p>
        </div>
      </section>
      <Projects data={projects} />

      <CommitmentSection />
      <Video />
      <AboutSectionOne />
      <Testimonials />    
    </>
  );
}

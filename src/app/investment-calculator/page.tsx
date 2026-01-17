import InvestmentCalculator from "@/components/InvestmentCalculator"
import FAQ from "@/components/InvestmentCalculator/FAQ"
import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL("https://kingsdevelopers.com"),
  title: "Property Payment Plan Calculator Kenya | Monthly Instalment Planner | Kings Developers",
  description:
    "Create a personalised property payment schedule in seconds. Enter your price, deposit, and preferred repayment period to see the monthly instalments that fit your budget.",
  keywords: [
    "property payment plan calculator",
    "monthly instalment calculator Kenya",
    "real estate payment plan",
    "Kings Developers payment plan",
    "off-plan payment schedule",
    "deposit planner",
    "house instalment calculator",
    "developer financing Kenya",
    "mortgage alternative Kenya",
    "property purchase planning",
  ],
  authors: [{ name: "Kings Developers" }],
  creator: "Kings Developers",
  publisher: "Kings Developers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/investment-calculator",
  },
  openGraph: {
    title: "Property Payment Plan Calculator | Kings Developers",
    description:
      "Plan your property payments with ease. Enter the price, deposit, and timeline to instantly view a tailored monthly instalment plan.",
    url: "/investment-calculator",
    siteName: "Kings Developers",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kings Developers Payment Plan Calculator – Build Your Instalment Schedule",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kings Developers Payment Plan Calculator",
    description:
      "Simplify your property purchase. Instantly calculate monthly instalments based on your deposit and preferred payment period.",
    creator: "@kingsdevelopers",
    site: "@kingsdevelopers",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kings Developers Payment Plan Calculator",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function InvestmentCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kings Developers Payment Plan Calculator",
    description:
      "Plan your Kings Developers payment schedule by entering a property price, deposit amount, and repayment period to see clear monthly instalments.",
    url: "https://kingsdevelopers.com/investment-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: "Kings Developers",
      url: "https://kingsdevelopers.com",
      logo: "https://kingsdevelopers.com/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+254700090060",
        contactType: "sales",
        areaServed: "KE",
        availableLanguage: "English",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
        addressRegion: "Nairobi",
      },
    },
    featureList: [
      "Deposit planning",
      "Monthly instalment projection",
      "Flexible repayment timelines",
      "Interest-free comparison view",
      "Supports off-plan projects",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Home buyers",
      geographicArea: "Kenya",
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kingsdevelopers.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Payment Plan Calculator",
        item: "https://kingsdevelopers.com/investment-calculator",
      },
    ],
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is the monthly payment calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We subtract your deposit from the property price and divide the balance by the number of months you prefer. The result shows a clear interest-free monthly instalment so you can plan confidently before adding financing costs.",
        },
      },
      {
        "@type": "Question",
        name: "Can I include interest or other charges?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This calculator keeps the math simple and interest-free. Once you are comfortable with the base payment, a Kings Developers consultant can help layer in bank interest, service charge, or legal fees to build a detailed plan.",
        },
      },
      {
        "@type": "Question",
        name: "What deposit amount should I aim for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most buyers start with a 10-30% deposit. Use the quick-fill buttons to test different percentages and see how they affect your monthly payment. We can always personalise the plan if you need a different structure.",
        },
      },
      {
        "@type": "Question",
        name: "Does this work for off-plan projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Enter the total price and a repayment period that mirrors your construction timeline. Our sales team can translate those results into milestone-based stages after you enquire.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.18),transparent_55%)]" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-20 sm:py-24">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-gold-200 backdrop-blur">
            Easy payment planning
          </div>
          <h1 className="max-w-3xl font-serif text-4xl font-light tracking-tight text-white sm:text-5xl">
            Map out your Kings Developers payment plan in minutes
          </h1>
          <p className="max-w-2xl text-lg text-slate-200">
            Keep your budgeting clear and effortless. Enter the price, deposit, and repayment timeline to see a transparent monthly instalment tailored to you.
          </p>
          
          <div className="pt-4">
            <Link
              href="#payment-plan-calculator"
              className="inline-flex items-center rounded-full bg-gold-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-gold-400"
            >
              Start planning now
            </Link>
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="flex justify-center bg-white py-16 text-slate-500">Loading calculator...</div>}>
        <InvestmentCalculator />
      </Suspense>
      <FAQ />
    </>
  )
}

"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const faqData = [
  {
    question: "What types of properties does Kings Developers offer?",
    answer:
      "We offer a comprehensive range of luxurious properties that range from premium to mid to high end properties. They include, apartments, townhouses and commercial spaces.",
  },
  {
    question: "Are your properties suitable for investment purposes?",
    answer:
      "Absolutely. Our properties are strategically located in high-growth areas with excellent rental yields and capital appreciation potential. We provide detailed investment analysis and market insights to help you make informed investment decisions.",
  },
  {
    question: "Do you offer property management services?",
    answer:
      "Yes, at Enhance Properly Lifestyle (ELP) Kenya, we offer comprehensive property management solutions designed to protect your investment and elevate your rental experience.",
  },
  {
    question: "What makes Kings Developers different from other developers?",
    answer:
      "Our 21+ years of experience, commitment to quality, sustainable building practices, and customer-centric approach set us apart. We focus on creating lasting value through superior design, premium materials, and exceptional service throughout the entire customer journey.",
  },
  {
    question: "Can diaspora investors purchase properties through Kings Developers?",
    answer:
      "Yes, we welcome diaspora investors and have streamlined processes to facilitate overseas purchases. We offer virtual property tours, digital documentation, and dedicated support to make investing from abroad convenient and secure.",
  },
]

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <Card className="border-0 mt-1 shadow-lg hover:shadow-xl transition-all duration-500 bg-white group my-8">
    <CardContent className="p-0">
      <button
        onClick={onToggle}
        className="w-full p-8 text-left flex items-center justify-between group-hover:bg-stone-50/50 transition-colors duration-300"
      >
        <h3 className="font-serif text-xl font-light text-slate-800 pr-4 leading-relaxed">{question}</h3>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors duration-300">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gold-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gold-600" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 pb-8">
          <div className="w-12 h-px bg-gold-500/30 mb-6"></div>
          <p className="text-slate-600/80 leading-relaxed font-light text-lg">{answer}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function LuxuryFAQSection() {
  const [openItems, setOpenItems] = useState(new Set([0])) // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="py-32 bg-stone-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mx-auto w-1 h-12 bg-gold-500 mb-8"></div>
          <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-[0.3em] text-gold-600 uppercase rounded-full bg-gold-500/10">
            Common Questions
          </span>
          <h2 className="mb-6 text-5xl md:text-6xl font-serif font-light text-slate-800 tracking-tight">
            Frequently Asked
            <span className="block font-normal bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-slate-600/70 text-xl leading-relaxed font-light">
            Everything you need to know about investing in premium properties with Kings Developers
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-light text-slate-800 mb-4">Still Have Questions?</h3>
            <p className="text-slate-600/80 mb-6 font-light leading-relaxed">
              Our property experts are here to help you make informed decisions about your real estate investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 hover:bg-gold-600 text-slate-900 font-sans font-medium rounded-full transition-colors duration-300"
              >
                Get In Touch
              </a>
              <a
                href="tel:+254700000000"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gold-500/20 text-gold-600 hover:bg-gold-50 font-sans font-medium rounded-full transition-colors duration-300"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

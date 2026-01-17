"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How do you calculate the monthly payment?",
    answer: "We subtract your deposit from the property price and divide the balance by the number of months available till completion for the respective project"
  },
  {
    question: "What deposit amount should I plan for?",
    answer: "Most of our home buyers set aside 10-30% of the purchase price as a deposit. Use the quick-fill buttons to test different scenarios. "
  },
  {
    question: "How long can I pay for a property",
    answer: "Our payment plans are structured throughout the construction period of a property."
  }
]

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-16 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block w-1 h-12 bg-gold-500 mb-6 rounded-full" aria-hidden="true"></div>
          <h2 id="faq-heading" className="font-serif text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-tight">
            Payment plan essentials
          </h2>
          <p className="text-slate-600/70 text-lg font-light max-w-2xl mx-auto">
            Get quick answers about structuring your Kings Developers payment plan and what to expect next.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <Card key={index} className="border border-slate-200 hover:border-gold-300 transition-colors duration-300">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-inset"
                  aria-expanded={openItems.includes(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800 text-lg pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItems.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-gold-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gold-600" />
                      )}
                    </div>
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div 
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6 pt-0"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <p className="text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Need a custom payment schedule that fits your budget?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Talk to our sales team
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ

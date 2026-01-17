"use client"

import Image from "next/image"

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

export default function CommitmentSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          loader={imageLoader}
          src="/king.png"
          alt="Kings Developers craftsmanship"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/60" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,128,0.15),transparent_50%)]" aria-hidden="true" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-white">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 text-xs font-semibold tracking-[0.3em] uppercase rounded-full bg-white/10 text-gold-300">
            Our Commitment
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
            Our Commitment to Excellence
          </h2>
          <p className="text-lg leading-relaxed font-light text-white/75">
            At Kings Developers, quality is not just a standard—it is our foundation. Every project we undertake is a testament to superior craftsmanship, meticulous planning, and an unwavering commitment to excellence.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <div className="space-y-6 text-white/80 text-lg leading-relaxed font-light">
            <p>
              We uphold the highest standards in design, construction, and customer service, ensuring that every Kings Developers project reflects distinction and durability.
            </p>
            <p>
              From material selection to project execution, every stage is rigorously monitored, guaranteeing precision and perfection.
            </p>
            <p>
              We adhere to both national and international regulations, exceeding compliance to deliver industry-leading developments.
            </p>
          </div>
          <div className="space-y-6 text-white/80 text-lg leading-relaxed font-light">
            <p>
              Our pursuit of excellence is continuous—we innovate, refine, and push boundaries to elevate our services and exceed expectations.
            </p>
            <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl shadow-black/30 space-y-4">
              <p className="text-2xl font-serif font-light text-white">
                “At Kings Developers, we don't just build structures—we create timeless landmarks of quality and trust.”
              </p>
              <span className="block text-sm uppercase tracking-[0.3em] text-gold-300">Kings Developers</span>
            </div>
            <p>
              Every development we deliver is engineered for resilience, crafted to inspire, and designed to stand the test of time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

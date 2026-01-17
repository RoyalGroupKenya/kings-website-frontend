"use client"

import { IconBrandWhatsapp } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}
const LuxuryFooter = () => {
  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=2000')] bg-cover bg-center opacity-5" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Link href="/" className="inline-block mb-8">
             
                <Image
                src="/kings.png"
                loader={imageLoader}
                alt="Kings Developers"
                width={120}
                height={60}
                className="object-contain brightness-0 invert"
                priority
              />
                
              </Link>
          
            </div>

            <p className="text-white/70 text-lg leading-relaxed font-light mb-8 max-w-md">
              Choosing Kings Developers means you're choosing the best guide in the Kenyan real estate sector.
            </p>

            {/* Contact Information */}
            <div className="space-y-4 mb-8">
              <a
                href="tel:+254700090060"
                className="flex items-center gap-3 text-white/80 hover:text-gold-400 transition-colors duration-300 font-light"
              >
                <Phone className="w-5 h-5 text-gold-500" />
                +254 700 090 060
              </a>
              <a
                href="mailto:sales@kingsdevelopers.com"
                className="flex items-center gap-3 text-white/80 hover:text-gold-400 transition-colors duration-300 font-light"
              >
                <Mail className="w-5 h-5 text-gold-500" />
                sales@kingsdevelopers.com
              </a>
              <div className="flex items-center gap-3 text-white/80 font-light">
                <MapPin className="w-5 h-5 text-gold-500" />
                Nairobi, Kenya
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/kingsdeveloperskenya/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-gold-500/20 transition-all duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.1 10.4939V7.42705C12.1 6.23984 13.085 5.27741 14.3 5.27741H16.5V2.05296L13.5135 1.84452C10.9664 1.66676 8.8 3.63781 8.8 6.13287V10.4939H5.5V13.7183H8.8V20.1667H12.1V13.7183H15.4L16.5 10.4939H12.1Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/kingsdeveloperskenya/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-gold-500/20 transition-all duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.5 3H7.5C5.567 3 4 4.567 4 6.5V15.5C4 17.433 5.567 19 7.5 19H16.5C18.433 19 20 17.433 20 15.5V6.5C20 4.567 18.433 3 16.5 3ZM18.5 15.5C18.5 16.881 17.381 18 16 18H8C6.619 18 5.5 16.881 5.5 15.5V6.5C5.5 5.119 6.619 4 8 4H16C17.381 4 18.5 5.119 18.5 6.5V15.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"
                    fill="currentColor"
                  />
                  <circle cx="17.25" cy="6.75" r="1" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://x.com/kingsdevelopers/"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-gold-500/20 transition-all duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.9831 19.25L9.82094 13.3176L4.61058 19.25H2.40625L8.843 11.9233L2.40625 2.75H8.06572L11.9884 8.34127L16.9034 2.75H19.1077L12.9697 9.73737L19.6425 19.25H13.9831ZM16.4378 17.5775H14.9538L5.56249 4.42252H7.04674L10.808 9.6899L11.4584 10.6039L16.4378 17.5775Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/channel/UCMWnV-ieI_pEc-8VHAFzGUw/videos"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-gold-500/20 transition-all duration-300"
              >
                <svg width="20" height="16" viewBox="0 0 18 14" className="fill-current">
                  <path d="M17.5058 2.07119C17.3068 1.2488 16.7099 0.609173 15.9423 0.395963C14.5778 7.26191e-08 9.0627 0 9.0627 0C9.0627 0 3.54766 7.26191e-08 2.18311 0.395963C1.41555 0.609173 0.818561 1.2488 0.619565 2.07119C0.25 3.56366 0.25 6.60953 0.25 6.60953C0.25 6.60953 0.25 9.68585 0.619565 11.1479C0.818561 11.9703 1.41555 12.6099 2.18311 12.8231C3.54766 13.2191 9.0627 13.2191 9.0627 13.2191C9.0627 13.2191 14.5778 13.2191 15.9423 12.8231C16.7099 12.6099 17.3068 11.9703 17.5058 11.1479C17.8754 9.68585 17.8754 6.60953 17.8754 6.60953C17.8754 6.60953 17.8754 3.56366 17.5058 2.07119ZM7.30016 9.44218V3.77687L11.8771 6.60953L7.30016 9.44218Z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/kings-developers-limited/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-gold-500/20 transition-all duration-300"
              >
                <svg width="20" height="18" viewBox="0 0 17 16" className="fill-current">
                  <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
                </svg>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=254700090060"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-gold-500/20 transition-all duration-300"
              >
                <IconBrandWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-light text-white mb-8 tracking-tight">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/projects"
                  className="text-white/70 hover:text-gold-400 transition-colors duration-300 font-light"
                >
                  Our Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/to-let"
                  className="text-white/70 hover:text-gold-400 transition-colors duration-300 font-light"
                >
                  Properties to Let
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-white/70 hover:text-gold-400 transition-colors duration-300 font-light"
                >
                  Insights & News
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-gold-400 transition-colors duration-300 font-light"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif text-xl font-light text-white mb-8 tracking-tight">Support & Help</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-gold-400 transition-colors duration-300 font-light"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/frequently-asked-questions"
                  className="text-white/70 hover:text-gold-400 transition-colors duration-300 font-light"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/70 hover:text-gold-400 transition-colors duration-300 font-light"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white/60 font-light">
              Copyright © 2024{" "}
              <a
                href="https://www.kingsdevelopers.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 font-medium hover:text-gold-300 transition-colors duration-300"
              >
                Kings Developers Ltd
              </a>
              . All rights reserved.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/40 text-sm font-light">
              Website Powered By{" "}
              <a
                href="https://shiftmarketers.co.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400/80 font-medium hover:text-gold-300 transition-colors duration-300"
              >
                Shiftpulse Marketers
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gold-500/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-gold-500/5 blur-2xl"></div>
    </footer>
  )
}

export default LuxuryFooter
